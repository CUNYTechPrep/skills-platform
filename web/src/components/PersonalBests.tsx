import React from "react";
import { FaRunning, FaBicycle, FaWalking } from "react-icons/fa";

const PersonalBests: React.FC = () => {
  return (
    <div className="mt-5">
      <h3 className="font-bold mb-4">Personal Bests</h3>
      <div className="flex flex-col gap-4">
        <div className="bg-purple-200 p-4 py-8 rounded-lg flex items-center justify-between text-left">
          <div>
            <p className="font-semibold">Fastest FizzBuzz Run:</p>
            <p className="text-lg">22min</p>
          </div>
          <span className="text-purple-700">
            <FaRunning size={40} />
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-200 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="font-semibold">Longest Lesson:</p>
            <p className="text-lg mb-2">45 minutes</p>
            <span className="text-orange-700">
              <FaBicycle size={30} />
            </span>
          </div>
          <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <p className="font-semibold">Longest Coding - Streak:</p>
            <p className="text-lg mb-2">2 hours</p>
            <span className="text-green-700">
              <FaWalking size={30} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalBests;
