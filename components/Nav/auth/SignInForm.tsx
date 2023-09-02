"use client";

import { useState } from "react";
import GoogleButton from "./GoogleButton";
import { useRouter } from "next/navigation";
import GitHubButton from "./GitHubButton";

const SignInForm = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center justity-center gap-8 mt-16 h-[450px] w-[600px] p-5 border border-slate-500 rounded-md">
      <h2 className="text-3xl mt-10 w-fit text-center">
        Enter your credentials
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
          type="password"
          placeholder="Password"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        ></input>
        <button className="btn-primary justify-center mt-4 w-[100px]">
          log in
        </button>
      </form>
      <div className="flex gap-4">
        <GoogleButton />
        <GitHubButton />
      </div>
      <div className="flex items-center gap-2">
        <span>Don't have an account yet?</span>
        <button
          onClick={() => push("/auth/register")}
          className="font-bold"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
