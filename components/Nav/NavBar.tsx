

import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth].js";
import Login from "./auth/Login.tsx";
import Logged from "./auth/Logged.tsx";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center h-[200px] justify-between p-16 border-b border-slate-700">
      <div>
        <h1 className="text-6xl ml-12">
          <Link href="/">LogoApp</Link>
        </h1>
      </div>
      <div className="flex mr-32 items-center pt-8">
        <div className="flex items-center justify-center h-[200px] w-[150px] text-center ">
          <Link href="/" className="hover:text-xl hover:text-slate-500">
            Home
          </Link>
        </div>
        <div className="flex items-center justify-center h-[200px] w-[150px] text-center ">
          <Link href="/" className="hover:text-xl hover:text-slate-500">
            Dashboard
          </Link>
        </div>
        <div className="flex items-center justify-center h-[200px] w-[150px] text-center ">
          <Link href="/" className="hover:text-xl hover:text-slate-500">
            Other
          </Link>
        </div>
      </div>
      <div className="pt-8">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image} />}
      </div>
    </header>
  );
};

export default NavBar;
