import { Daily, SingleTime, Weekdays, Weekends, Weekly } from "./Dates";

export type Habit = {
  id: string;
  name: string;
  schedule: SingleTime | Daily | Weekly | Weekdays | Weekends;
};

export type Task = {
  id: string;
  habbitId: Habit["id"];
  text: string;
  isDone: boolean;
};
