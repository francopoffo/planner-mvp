"use client";

import { FormEvent, useState } from "react";
import GoogleButton from "./GoogleButton";
import GitHubButton from "./GitHubButton";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { NextApiResponse } from "next";

const SignInForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(true);

  let login;

  const { push } = useRouter();

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();
    login = await signIn("credentials", {
      ...loginData,
      redirect: false,
    });

    console.log(login);

    if (login!.ok) {
      push("/");
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }
  };

  if (!loginSuccess) {
    return (
      <span className="my-64 flex justify-center text-lg font-bold text-white">
        Login error! Use the correct credentials.
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justity-center gap-8 mt-16 h-[450px] w-[600px] p-5 border border-slate-500 rounded-md">
      <h2 className="text-3xl mt-10 w-fit text-center">
        Enter your credentials
      </h2>
      <form
        onSubmit={onLoginHandler}
        className="flex flex-col items-center gap-4 text-slate-900 w-full"
      >
        <input
          type="text"
          placeholder="Email"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="w-[70%] px-4 py-2 rounded-md leading-5"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        ></input>
        <button className="btn-primary justify-center mt-4 w-[100px]">
          log in
        </button>
      </form>
      {/* <div className="flex gap-4">
        <GoogleButton />
        <GitHubButton />
      </div> */}
      <div className="flex items-center gap-2">
        <span>Don't have an account yet?</span>
        <button onClick={() => push("/auth/register")} className="font-bold">
          Register
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
