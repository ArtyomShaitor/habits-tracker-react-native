import { Daily, SingleTime, Weekdays, Weekends, Weekly } from "./Dates";

export type Schedules = SingleTime | Daily | Weekly | Weekdays | Weekends;

export type Habit<S extends Schedules = Schedules> = {
  id: string;
  name: string;
  schedule: S;
};

export type Task = {
  id: string;
  habbitId: Habit["id"];
  text: string;
  isDone: boolean;
};
