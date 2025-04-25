import React from "react";
import { scheduleSchema } from "../types";

interface ScheduleItemProps {
  item: scheduleSchema;
  bgColor: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, bgColor }) => {
  const maxParticipantsToShow = 4;
  const participantsToShow = item.Participants.slice(0, maxParticipantsToShow);

  return (
    <div
      className={`flex ${bgColor} w-full gap-5 p-3 rounded-2xl items-center`}
    >
      <div className="flex flex-col text-center w-[10%] flex-shrink-0">
        <div className="text-2xl">{item.date.numOfMonth}</div>
        <div className="font-serif">{item.date.dayOfTheWeek}</div>
      </div>
      <div className="flex flex-col flex-grow min-w-0">
        <div className="ml-2 truncate">{item.activity}</div>
        <div className="flex mt-1">
          {participantsToShow.map((participant) => (
            <img
              key={participant.id}
              src={participant.pfp}
              alt={participant.username}
              className="w-8 h-8 rounded-full p-1 -ml-2 first:ml-0 flex-shrink-0"
            />
          ))}
          {item.Participants.length > maxParticipantsToShow && (
            <div className="w-8 h-8 rounded-full p-1 -ml-2 bg-gray-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
              +{item.Participants.length - maxParticipantsToShow}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center flex-shrink-0">
        <button className="border bg-white border-hidden rounded-full h-10 font-serif flex items-center justify-center cursor-pointer text-sm px-5 py-1">
          Join
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
