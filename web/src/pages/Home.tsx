import React from "react";
import PopularActivities from "../components/PopularActivities";
import WeeklySchedule from "../components/WeeklySchedule";

import PersonalBests from "../components/PersonalBests";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
