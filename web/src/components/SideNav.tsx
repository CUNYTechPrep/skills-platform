import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

interface SideNavProps {
  setCurrentPage: (page: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    toggleMenu(); // close the menu after clicking
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-violet-700 text-white rounded"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <FaBars size={20} />
      </button>

      <div
        className={`
          bg-violet-800 text-white 
          fixed top-0 left-0 h-screen z-40 
          flex flex-col items-stretch text-center gap-6 p-6 
          transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:h-full md:w-64 md:rounded-l-3xl md:rounded-tr-none md:translate-x-0 md:flex-shrink-0 md:p-0 md:gap-6 md:items-stretch md:justify-start md:overflow-y-auto md:overflow-x-hidden
        `}
      >
        <div className="mt-6 text-xl md:text-2xl p-2 md:p-0 whitespace-nowrap">
          TTP Code App
        </div>

        {/* 👇 use onClick instead of href */}
        <button
          onClick={() => handleNavClick("home")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Home
        </button>
        <button
          onClick={() => handleNavClick("profile")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Profile
        </button>
        <button
          onClick={() => handleNavClick("schedule")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Schedule
        </button>
        <button
          onClick={() => handleNavClick("activities")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Activities
        </button>
        <button
          onClick={() => handleNavClick("settings")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Settings
        </button>
        <button
          onClick={() => handleNavClick("quiz")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Quiz
        </button>
        <button
          onClick={() => handleNavClick("leetcode")}
          className="text-base md:text-lg p-2 md:p-0"
        >
          Leetcode
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default SideNav;
