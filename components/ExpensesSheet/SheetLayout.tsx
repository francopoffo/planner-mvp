"use client";

import { useState } from "react";
import AddForm from "./AddForm";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SheetLine from "./SheetLine";
import { expenseOrEarning } from "@/types/expenseAndEarning";

type SheetLayoutProps = {
  title: string;
};

const allExpenses = async () => {
  const response = await axios.get("/api/expensesAndEarnings/get", {
    params: {
      type: false,
    },
  });
  return response.data;
};

const SheetLayout = ({ title }: SheetLayoutProps) => {
  const [isForm, setIsForm] = useState(false);

  const onToggleAddForm = () => {
    setIsForm(!isForm);
  };

  const { data, error, isLoading } = useQuery({
    queryFn: allExpenses,
    queryKey: ["expenses"],
  });

  if (error) return error;
  if (isLoading)
    return (
      <p className="my-8 flex justify-center text-lg font-bold text-gray-700">
        Loading the page...
      </p>
    );

  return (
    <div className="w-[45%] border-2 border-solid border-blue-100 rounded-md">
      {isForm ? <AddForm title="gasto" onToggle={onToggleAddForm} /> : ""}
      <header className="flex justify-between text-center text-lg border-b-2 bg-blue-100 text-slate-900 font-bold">
        <h2 className="py-2 px-4">{title}</h2>
        <button
          className="bg-slate-900 rounded-md text-blue-100 p-2 mr-2 hover:bg-slate-700 hover:text-white"
          onClick={() => setIsForm(!isForm)}
        >
          New
        </button>
      </header>
      <div className="p-4">
        <ul className="flex flex-col gap-4">
          <li>
            <div className="flex justify-between">
              <span className="w-[55%]">Descrição</span>
              <span className="w-[15%]">Valor</span>
              <span className="w-[30%]">Situação</span>
            </div>
            <hr className="mt-2" />
          </li>
          {data?.map((expense: expenseOrEarning) => (
            <SheetLine
              description={expense.description}
              value={expense.value}
              situation={expense.situation}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SheetLayout;
