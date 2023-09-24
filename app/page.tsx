"use client";

import SheetLayout from "@/components/ExpensesSheet/SheetLayout";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const allExpenses = async () => {
  const response = await axios.get("/api/expensesAndEarnings/getExpense");
  return response.data;
};

const allEarnings = async () => {
  const response = await axios.get("/api/expensesAndEarnings/getEarning");
  return response.data;
};

export default function Home() {
  const { data: session, status } = useSession();

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
    return (
      <span className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Error fetching expenses!
      </span>
    );
  }

  if (expensesQuery.isLoading)
    return (
      <span className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </span>
    );

  if (earningsQuery.error) {
    console.log(earningsQuery.error);
    return (
      <span className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Error fetching earnings!
      </span>
    );
  }

  if (earningsQuery.isLoading)
    return (
      <span className="my-64 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </span>
    );

  return (
    <main>
      {status == "authenticated" && <span className="mt-48 w-full flex text-lg">Hello, {session.user?.name}!</span>}
      <section className="mt-8 w-full flex gap-8">
        {status == "authenticated" ? (
          <>
            <SheetLayout
              title="Gastos"
              typeOf={"expenses"}
              data={expensesQuery.data}
            />
            <SheetLayout
              title="Ganhos"
              typeOf={"earnings"}
              data={earningsQuery.data}
            />
          </>
        ) : (
          <span className="my-64 ml-32 text-center text-4xl font-bold text-gray-700"> 
            Welcome to the official financial planner for the ON THE ROCKS
            party!
            <br></br>
            <br></br>
            <br></br>
            Better to be organized.
          </span>
        )}
      </section>
    </main>
  );
}
