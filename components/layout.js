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
    <Link href="/signin">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Sign In
      </a>
    </Link>
    <Link href="/signup">
      <a className="no-underline text-green-600 uppercase tracking-wide font-bold text-xs py-3 mr-8 cursor-pointer hover:text-green-400">
        Sign Up
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
    <button onClick={handleSignOut} className="text-red-600">
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
