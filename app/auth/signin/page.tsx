import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { redirect } from "next/navigation";
import GoogleButton from "@/components/Nav/auth/GoogleButton";
import GitHubButton from "@/components/Nav/auth/GitHubButton";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center mt-48">
      <div className="flex flex-col items-center justity-center gap-8 mt-16 h-[300px] w-[300px] p-5 border border-slate-500 rounded-md">
        <h2 className="text-3xl mt-10 w-[150px] text-center">Sign in</h2>
        <GoogleButton />
        <GitHubButton />
      </div>
    </section>
  );
};

export default SignIn;
