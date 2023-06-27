"use client";

import Image from "next/image";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

type User = {
  image: string | null | undefined;
};

const Logged = ({ image }: User) => {
  let userImage;

  if (image) {
    userImage = image;
  } else {
    userImage = "/user.png";
  }

  return (
    <div className="flex items-center justify-center h-[200px] w-[300px] text-center">
      <div className="flex gap-2 items-center hover:text-xl hover:text-slate-500">
        <Image
          width={64}
          height={64}
          src={userImage}
          quality={100}
          alt="Picture of the logged user."
          className="w-14 rounded-full"
          priority
        />
        <button onClick={() => signOut()}>
          <BiLogOut className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Logged;
