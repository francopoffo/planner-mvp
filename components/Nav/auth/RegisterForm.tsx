"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center justity-center gap-8 mt-16 h-[450px] w-[600px] p-5 border border-slate-500 rounded-md">
      <h2 className="text-3xl mt-10 w-fit text-center">
        Register your credentials
      </h2>
      <form className="flex flex-col items-center gap-4 text-slate-900 w-full">
        <input
          type="text"
          placeholder="Username"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
        ></input>
        <input
          type="text"
          placeholder="Email"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        ></input>
        <button className="btn-primary justify-center mt-4 w-[100px]">
          register
        </button>
      </form>
      <div className="flex items-center gap-2">
        <span>Do you already have an account?</span>
        <button onClick={() => push("/auth/signin")} className="font-bold">
          Go to login page
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
