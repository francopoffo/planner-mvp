"use client";

import { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const ResponsiveNav = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <div className="md:hidden">
        <button
          className="p-2 text-white hover:text-slate-400 focus:text-slate-400 focus:border-slate-400 focus:border rounded-md"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? (
            <MdClose className="w-[50px] h-[50px]" />
          ) : (
            <GiHamburgerMenu className="w-[50px] h-[50px]" />
          )}
        </button>
      </div>
      <div
        className={`z-50 bg-slate-900 md:block md:pb-0 md:mt-0 ${
          navbar
            ? "absolute top-[170px] left-[13px] p-2 md:p-0 md:block border-slate-400 border rounded-md"
            : "hidden"
        }`}
      >
        <ul className="md:mr-8 md:flex lg:mr-16 items-center justify-center">
          <li className="nav-link">
            <Link href="/" onClick={() => setNavbar(!navbar)}>
              About
            </Link>
          </li>
          <li className="nav-link">
            <Link href="/" onClick={() => setNavbar(!navbar)}>
              Blogs
            </Link>
          </li>
          <li className="nav-link">
            <Link href="/" onClick={() => setNavbar(!navbar)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveNav;
