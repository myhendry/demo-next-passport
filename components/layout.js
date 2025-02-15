import React from "react";
import Link from "next/link";

import { useUser } from "../lib/hooks";

const UnAuthLinks = () => (
  <>
    <Link href="/">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Home
      </a>
    </Link>
    <Link href="/pokemon">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Pokemon
      </a>
    </Link>
    <Link href="/signin">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Member
      </a>
    </Link>
  </>
);

const AuthLinks = ({ handleSignOut }) => (
  <>
    <Link href="/">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Home
      </a>
    </Link>
    <Link href="/pokemon">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Pokemon
      </a>
    </Link>
    <Link href="/auth/protected">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Protected
      </a>
    </Link>
    <button
      onClick={handleSignOut}
      className="bg-red-600 rounded px-2 text-white text-sm shadow-md cursor-pointer hover:bg-red-700"
    >
      Sign Out
    </button>
  </>
);

const Layout = ({ children }) => {
  const [user, { mutate }] = useUser();
  const handleSignOut = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    // set the user state to null
    mutate(null);
  };

  return (
    <div className="font-body">
      <nav className="bg-white px-8 py-2 shadow-md flex items-center justify-between">
        <div className="h-10 w-10 p-3 mr-3 rounded bg-teal-600 flex items-center justify-center">
          <h1 className="text-white text-2xl font-semibold">HL</h1>
        </div>
        <div className="mb-px flex justify-center">
          {user ? <AuthLinks handleSignOut={handleSignOut} /> : <UnAuthLinks />}
        </div>
      </nav>
      <main className="my-3 mx-12">{children}</main>
    </div>
  );
};

export default Layout;
