import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import RightContent from "./components/RightContent";
// function App() {
//   return (
//     <>
//       {/* This is where the Navbar and other components will be rendered */}
//
//     </>

export default function App() {
  return (
    <div className="bg-[url('./assets/temp-background.png')] bg-cover w-screen h-screen flex justify-center items-center p-4">
      <div className="border rounded-3xl border-hidden w-full max-w-7xl h-full max-h-[95vh] bg-white flex flex-col md:flex-row overflow-hidden">
        <div className="flex-shrink-0">
          <SideNav />
        </div>
        <Outlet />{" "}
        {/* This is where the Content (child routes) will be rendered */}
        <div className="w-full md:w-64 p-4 flex-shrink-0 overflow-y-auto min-h-0">
          <RightContent />
        </div>
      </div>
    </div>
  );
}
