"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ToggleDelete from "./ToggleDelete";

type SheetLineProps = {
  description: string;
  value: string;
  situation: string;
  id: string;
};

const SheetLine = ({ description, value, situation, id }: SheetLineProps) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const queryClient = useQueryClient();
  let deleteToastID: string;

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/expensesAndEarnings/delete", { params: { id } }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.remove(deleteToastID);
          toast.error(error?.response?.data.message, { id: deleteToastID });
        }
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["expenses"]);
        queryClient.invalidateQueries(["earnings"]);
        toast.remove(deleteToastID);
        toast.success("Deleted.", { id: deleteToastID });
      },
    }
  );

  const deleteExpenseOrEarning = async () => {
    deleteToastID = toast.loading("Deleting...", { id: deleteToastID });
    mutate(id);
  };

  const onToggle = () => {
    setToggleDelete(!toggleDelete);
  };

  return (
    <>
      <li>
        <div className="flex justify-between">
          <span className="w-[45%]">{description}</span>
          <span className="w-[15%]">{`R$ ${value}`}</span>
          <span className="w-[30%] uppercase">{situation}</span>
          <div className="w-[10%] flex gap-4 ">
            <button className="text-xl" onClick={() => setToggleEdit(!toggleDelete)}>
              <AiOutlineEdit />
            </button>
            <button className="text-xl" onClick={() => setToggleDelete(!toggleEdit)}>
              <AiOutlineDelete />
            </button>
          </div>
        </div>
        <hr className="mt-2" />
      </li>
      {toggleDelete && (
        <ToggleDelete onToggle={onToggle} onDelete={deleteExpenseOrEarning} />
      )}
    </>
  );
};

export default SheetLine;
