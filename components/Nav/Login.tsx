"use client"

import Link from "next/link";
import React from "react";
import { BiLogIn } from "react-icons/bi";
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <div className="flex items-center justify-center h-[200px] w-[300px] text-center">
      <Link
        href="/"
        className="flex gap-1 items-center hover:text-xl hover:text-slate-500"
      >
        <button onClick={() => signIn("google")}>Log in or Sign up</button>
        <BiLogIn className="text-2xl" />
      </Link>
    </div>
  );
};

export default Login;
