import React from "react";
import ScheduleItem from "./ScheduleItem";
import { scheduleSchema } from "../types";
import activitiesImage from "../assets/activities.png";

const scheduleItemsData: scheduleSchema[] = [
  {
    date: { dayOfTheWeek: "MON", numOfMonth: 13 },
    activity: "AI",
    Participants: [
      { id: "1", username: "user1", pfp: activitiesImage },
      { id: "2", username: "user2", pfp: activitiesImage },
      { id: "3", username: "user3", pfp: activitiesImage },
      { id: "4", username: "user4", pfp: activitiesImage },
      { id: "5", username: "user5", pfp: activitiesImage },
    ],
  },
  {
    date: { dayOfTheWeek: "TUES", numOfMonth: 14 },
    activity: "Python",
    Participants: [
      { id: "1", username: "user1", pfp: activitiesImage },
      { id: "2", username: "user2", pfp: activitiesImage },
    ],
  },
  {
    date: { dayOfTheWeek: "WED", numOfMonth: 15 },
    activity: "Soft Skills",
    Participants: [
      { id: "1", username: "user1", pfp: activitiesImage },
      { id: "3", username: "user3", pfp: activitiesImage },
      { id: "4", username: "user4", pfp: activitiesImage },
    ],
  },
  {
    date: { dayOfTheWeek: "THURS", numOfMonth: 16 },
    activity: "Cyber Security",
    Participants: [
      { id: "1", username: "user1", pfp: activitiesImage },
      { id: "2", username: "user2", pfp: activitiesImage },
      { id: "3", username: "user3", pfp: activitiesImage },
      { id: "4", username: "user4", pfp: activitiesImage },
      { id: "5", username: "user5", pfp: activitiesImage },
      { id: "6", username: "user6", pfp: activitiesImage },
    ],
  },
];

const bgColors = [
  "bg-blue-200",
  "bg-yellow-200",
  "bg-green-200",
  "bg-pink-200",
];

const WeeklySchedule: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="font-bold pt-5 pb-5 flex-shrink-0">Weekly Schedule</div>
      <div className="flex flex-col gap-2 overflow-y-auto flex-grow hide-scrollbar">
        {scheduleItemsData.map((item, index) => (
          <ScheduleItem
            key={`${item.activity}-${item.date.numOfMonth}`}
            item={item}
            bgColor={bgColors[index % bgColors.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
