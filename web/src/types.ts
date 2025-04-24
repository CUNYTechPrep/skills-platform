import activitiesImage from "./assets/activities.png";

export interface participant {
  id: string;
  username: string;
  pfp: string;
}

export interface scheduleSchema {
  date: {
    dayOfTheWeek: "MON" | "TUES" | "WED" | "THURS" | "FRI" | "SAT" | "SUN";
    numOfMonth:
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 17
      | 18
      | 19
      | 20
      | 21
      | 22
      | 23
      | 24
      | 25
      | 26
      | 27
      | 28
      | 29
      | 30
      | 31;
  };
  activity: string;
  Participants: participant[];
}

export const exampleParticipant: participant = {
  id: "1",
  username: "user1",
  pfp: activitiesImage,
};
