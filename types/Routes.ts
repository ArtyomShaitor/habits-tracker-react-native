import { Habit } from "./Task";

export type Routes = {
  Home: undefined;
  HabitsList: undefined;
  HabitDetails: { task: Habit };
};
