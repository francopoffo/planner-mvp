import React from "react";

type SheetLayoutProps = {
  title: string;
};

const SheetLayout = ({ title }: SheetLayoutProps) => {
  return (
    <div className="w-[45%] border-2 border-solid border-blue-100 rounded-md">
      <header className="text-center py-2 text-lg border-b-2 bg-blue-100 text-slate-900 font-bold">{title}</header>
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
        </ul>
      </div>
    </div>
  );
};

export default SheetLayout;
