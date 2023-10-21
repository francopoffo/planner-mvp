"use client";

import { useState } from "react";
import AddForm from "./AddForm";
import SheetLine from "./SheetLine";
import { expenseOrEarningWithId } from "@/types/expenseAndEarningWithId";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type SheetLayoutProps = {
  title: string;
  typeOf: string;
  data?: expenseOrEarningWithId[];
};

const SheetLayout = ({ title, typeOf, data }: SheetLayoutProps) => {
  let totalValue: number = 0;

  data?.forEach((expense) => {
    totalValue += Number(expense.value);
  });

  const [isForm, setIsForm] = useState(false);
  const [sheetData, setSheetData] = useState(data);

  const onToggleAddForm = () => {
    setIsForm(!isForm);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) {
      return;
    }
    setSheetData((previousD) => {
      const oldIndex = previousD!.findIndex((d) => d.id === active.id);
      const newIndex = previousD!.findIndex((d) => d.id === over!.id);

      return arrayMove(previousD!, oldIndex, newIndex);
    });
  };

  return (
    <div className="w-[45%] h-fit border-2 border-solid border-blue-100 rounded-md">
      {isForm ? (
        <AddForm title="gasto" typeOf={typeOf} onToggle={onToggleAddForm} />
      ) : (
        ""
      )}
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
              <span className="w-[45%]">Descrição</span>
              <span className="w-[22%]">Valor</span>
              <span className="w-[23%]">Situação</span>
              <div className="w-[10%]"></div>
            </div>
            <hr className="mt-2" />
          </li>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={sheetData!}
              strategy={verticalListSortingStrategy}
            >
              {sheetData?.map((expense: expenseOrEarningWithId) => {
                return (
                  <SheetLine
                    key={expense.id}
                    id={expense.id}
                    description={expense.description}
                    value={expense.value}
                    situation={expense.situation}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </ul>
      </div>
      <div className="flex justify-end py-2 pr-4 gap-4">
        <span>Total</span>
        <span className="w-[100px]">
          {totalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
};

export default SheetLayout;
