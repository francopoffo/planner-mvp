"use client";

import React from "react";
import { BiLogIn } from "react-icons/bi";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex items-center justify-center text-center w-[200px]">
      <div className="flex gap-1 items-center hover:text-xl hover:text-slate-500">
        <button onClick={() => signIn()}>Log in or Sign up</button>
        <BiLogIn className="text-2xl" />
      </div>
    </div>
  );
};

export default Login;
