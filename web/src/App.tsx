import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import PopularActivities from "./components/PopularActivities";
import WeeklySchedule from "./components/WeeklySchedule";
import RightContent from "./components/RightContent";
import PersonalBests from "./components/PersonalBests";
// function App() {
//   return (
//     <>
//       {/* This is where the Navbar and other components will be rendered */}
//       <Outlet /> {/* This is where the child routes will be rendered */}
//     </>
// =======

export default function App() {
  return (
    <div className="bg-[url('./assets/temp-background.png')] bg-cover w-screen h-screen flex justify-center items-center p-4">
      <div className="border rounded-3xl border-hidden w-full max-w-7xl h-full max-h-[95vh] bg-white flex flex-col md:flex-row overflow-hidden">
        <div className="flex-shrink-0">
          <SideNav />
        </div>
        <div className="flex flex-col flex-1 w-full p-4 md:p-8 overflow-y-auto min-h-0">
          <PopularActivities />
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8">
            <div className="w-full md:w-1/2">
              <WeeklySchedule />
            </div>
            <div className="w-full md:w-1/2">
              <PersonalBests />
            </div>
          </div>
        </div>
        <div className="w-full md:w-64 p-4 flex-shrink-0 overflow-y-auto min-h-0">
          <RightContent />
        </div>
      </div>
    </div>
  );
}
