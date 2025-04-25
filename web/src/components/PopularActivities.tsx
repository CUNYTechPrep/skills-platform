import React from "react";
import activitiesImage from "../assets/activities.png";

const PopularActivities: React.FC = () => {
  return (
    <>
      <div className="font-bold pt-5 pb-5">Popular Activities</div>
      <div className="flex w-full h-1/2">
        <div className="flex flex-col w-1/5 h-full items-center">
          <img src={activitiesImage} alt="AI" className="w-[100%] h-1/2 p-2" />
          <img
            src={activitiesImage}
            alt="Python"
            className="w-[100%] h-1/2 p-2"
          />
        </div>
        <div className="w-2/5 h-full items-center">
          <img
            src={activitiesImage}
            alt="JavaScript"
            className="w-full h-full p-2"
          />
        </div>
        <div className="flex flex-col w-2/5 h-full items-center">
          <div className="flex w-full h-1/2">
            <img
              src={activitiesImage}
              alt="Soft Skills"
              className="w-[50%] h-full p-2"
            />
            <img
              src={activitiesImage}
              alt="Mindfulness"
              className="w-[50%] h-full p-2"
            />
          </div>
          <img
            src={activitiesImage}
            alt="Cyber Security"
            className="w-[100%] h-1/2 p-2"
          />
        </div>
      </div>
    </>
  );
};

export default PopularActivities;
