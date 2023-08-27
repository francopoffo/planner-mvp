"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { expenseOrEarning } from "@/types/expenseAndEarning";

type AddFormProps = {
  onToggle: () => void;
  title: string;
  typeOf: boolean;
};

const AddForm = ({ title, typeOf, onToggle }: AddFormProps) => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [situation, setSituation] = useState("");
  let toastID: string;

  const { mutate } = useMutation(
    async ({ description, value, situation }: expenseOrEarning) =>
      await axios.post("/api/expensesAndEarnings/add", {
        description,
        value,
        situation,
        type: typeOf,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.remove(toastID);
          toast.error(error?.response?.data.message, { id: toastID });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["expenses"]);
        toast.remove(toastID);
        toast.success("Success 🔥", { id: toastID });
        setDescription("");
        setValue("");
        setSituation("");
        onToggle();
      },
    }
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    toastID = toast.loading("Generating the new expense", { id: toastID });
    mutate({ description, value, situation });
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/50">
      <form
        onSubmit={submitHandler}
        className="absolute left-1/2 top-1/2 z-30 flex w-[35%] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-slate-900 p-12"
      >
        <h2 className="font-bold text-lg">Adicione um {title}</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="description">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            className="rounded-md text-black p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label className="text-sm" htmlFor="value">
            Valor
          </label>
          <input
            type="text"
            id="value"
            className="rounded-md text-black p-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Insira somente números"
            pattern="[0-9]*"
            required
          />
          <label className="text-sm" htmlFor="situation">
            Situação
          </label>
          <input
            type="text"
            id="situation"
            className="rounded-md text-black p-2"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
            onClick={() => onToggle()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md px-4 py-2 text-sm text-black bg-blue-100"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
