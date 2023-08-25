"use client";

import SheetLayout from "@/components/ExpensesSheet/SheetLayout";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const allExpenses = async () => {
  const response = await axios.get("/api/expensesAndEarnings/get", {
    data: {
      type: false,
    },
  });
  return response.data;
};

const allEarnings = async () => {
  const response = await axios.get("/api/expensesAndEarnings/get", {
    params: {
      type: true,
    },
  });
  return response.data;
};

export default function Home() {
  const [expensesQuery, earningsQuery] = useQueries({
    queries: [
      {
        queryKey: ["expenses"],
        queryFn: allExpenses,
      },
      {
        queryKey: ["earnings"],
        queryFn: allEarnings,
      },
    ],
  });

  if (expensesQuery.error) {
    console.log(expensesQuery.error);
    return <p>Error fetching expenses!</p>;
  }

  if (expensesQuery.isLoading)
    return (
      <p className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  if (earningsQuery.error) {
    console.log(earningsQuery.error);
    return <p>Error fetching earnings!</p>;
  }

  if (earningsQuery.isLoading)
    return (
      <p className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  return (
    <main>
      <section className="mt-48 w-full flex gap-8">
        <SheetLayout title="Gastos" typeOf={false} data={expensesQuery.data} />
        <SheetLayout title="Ganhos" typeOf={true} data={earningsQuery.data} />
      </section>
    </main>
  );
}
