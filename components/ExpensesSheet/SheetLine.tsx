import React from "react";

type SheetLineProps = {
  description: string;
  value: string;
  situation: string;
};

const SheetLine = ({ description, value, situation }: SheetLineProps) => {
  return (
    <li>
      <div className="flex justify-between">
        <span className="w-[55%]">{description}</span>
        <span className="w-[15%]">{value}</span>
        <span className="w-[30%]">{situation}</span>
      </div>
      <hr className="mt-2" />
    </li>
  );
};

export default SheetLine;
