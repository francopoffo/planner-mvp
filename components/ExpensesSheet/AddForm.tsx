"use client";

import { useState } from "react";

type AddFormProps = {
  onToggle: () => void;
  title: string;
};

const AddForm = ({ title, onToggle }: AddFormProps) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [situation, setSituation] = useState("");

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-black/50">
      <form className="absolute left-1/2 top-1/2 z-30 flex w-[50%] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-slate-900 p-12">
        <h2 className="font-bold text-lg">Adicione um {title}</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Descrição</label>
          <input
            type="text"
            className="rounded-md text-black p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="text-sm">Valor</label>
          <input
            type="text"
            className="rounded-md text-black p-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label className="text-sm">Situação</label>
          <input
            type="text"
            className="rounded-md text-black p-2"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
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
