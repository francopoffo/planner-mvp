import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth].js";
import Login from "./auth/Login.tsx";
import Logged from "./auth/Logged.tsx";
import ResponsiveNav from "./ResponsiveNav.tsx";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-10 mt-4 border-b border-slate-600 pb-8">
      <nav className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <h1 className="text-6xl text-center pt-4">
          <Link href="/">LogoApp</Link>
        </h1>
        <div className="flex items-center justify-between mt-4 mx-6">
          <ResponsiveNav />
          <div>
            {!session?.user && <Login />}
            {session?.user && <Logged image={session.user?.image} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
