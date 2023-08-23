import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type SheetLineProps = {
  description: string;
  value: string;
  situation: string;
};

const SheetLine = ({ description, value, situation }: SheetLineProps) => {
  return (
    <li>
      <div className="flex justify-between">
        <span className="w-[45%]">{description}</span>
        <span className="w-[15%]">{`R$ ${value}`}</span>
        <span className="w-[30%] uppercase">{situation}</span>
        <div className="w-[10%] flex gap-4 ">
          <button className="text-xl">
            <AiOutlineEdit />
          </button>
          <button className="text-xl">
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <hr className="mt-2" />
    </li>
  );
};

export default SheetLine;
