import React, { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [currentForm, setCurrentForm] = useState("Login"); // "Login" or "LogOut"

  const handleSignOut = () => {
    // Perform logout logic here (e.g., clear token, redirect, etc.)
    setCurrentForm("Login");
    alert("Signed out!");
  };

  return (
    <div className="flex flex-col gap-2 bg-white min-h-screen min-w-72 w-full sm:w-40 md:w-36 lg:w-44 border">
      <div className="flex flex-col mx-auto gap-0 h-full w-full p-0 border-t">
        <Link href="/home" className="flex items-center text-black hover:bg-gray-200 w-full p-10 font-bold border-t">
          <span className="text-lg sm:text-xl">Learn Coding</span>
        </Link>
        <Link href="/community" className="flex items-center text-black hover:bg-gray-200 w-full p-10 font-bold border-t">
          <span className="text-lg sm:text-xl">Events</span>
        </Link>
        <Link href="/myportfolio" className="flex items-center text-black hover:bg-gray-200 w-full p-10 font-bold border-t">
          <span className="text-lg sm:text-xl">Interview</span>
        </Link>
        <Link href="/schedule" className="flex items-center text-black hover:bg-gray-200 w-full p-10 font-bold border-t border-b">
          <span className="text-lg sm:text-xl">Progress</span>
        </Link>

        {currentForm === "Login" && (
          <div className="flex mx-auto flex-col my-2 mt-auto mb-5">
         
        <Link href="/login" passHref legacyBehavior>
            <a className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 text-center">
                <span className="text-lg sm:text-xl font-bold">Login</span>
            </a>
        </Link>

          </div>
        )}

        {currentForm === "LogOut" && (
          <div className="flex mx-auto flex-col my-2 mt-auto mb-5">
            <button
              onClick={handleSignOut}
              className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300"
            >
              <span className="text-lg sm:text-xl font-mono">LogOut</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
