"use client";

import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";



const GoogleButton = () => {
  return (
    <button className="btn-primary" onClick={() => signIn("google")}>
      <BsGoogle />
      with Google
    </button>
  );
};

export default GoogleButton;
