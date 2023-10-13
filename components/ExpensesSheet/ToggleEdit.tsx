"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { expenseOrEarningWithId } from "@/types/expenseAndEarningWithId";

type PropsToggleEdit = {
  onToggle: () => void;
  lineData: {
    id: string;
    description: string;
    value: string;
    situation: string;
  };
};

const ToggleEdit = ({ onToggle, lineData }: PropsToggleEdit) => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState(lineData.description);
  const [value, setValue] = useState(lineData.value);
  const [situation, setSituation] = useState(lineData.situation);
  let toastID: string;

  const id = lineData.id;

  const { mutate } = useMutation(
    async ({ id, description, value, situation }: expenseOrEarningWithId) =>
      await axios.put("/api/expensesAndEarnings/edit", {
        id,
        description,
        value,
        situation,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.remove(toastID);
          toast.error(error?.response?.data.message, { id: toastID });
        }
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["expenses"]);
        queryClient.invalidateQueries(["earnings"]);
        toast.remove(toastID);
        toast.success("Edited.", { id: toastID });
        onToggle();
      },
    }
  );

  const editHandler = async () => {
    toastID = toast.loading("Editing...", { id: toastID });
    mutate({ id, description, value, situation });
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/50">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-blue-100 p-12">
        <div className="flex flex-col gap-2 text-black">
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

        <div className="flex gap-4 self-end">
          <button
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
            onClick={() => onToggle()}
          >
            Cancel
          </button>
          <button
            onClick={editHandler}
            className="rounded-md bg-yellow-500 px-4 py-2 text-sm text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleEdit;
