"use client";

import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

const GitHubButton = () => {
  return (
    <button className="btn-primary" onClick={() => signIn("github")}>
      <BsGithub />
      with GitHub
    </button>
  );
};

export default GitHubButton;
