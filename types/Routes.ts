import { Habit } from "./Task";

export type Routes = {
  Home: undefined;
  HabitsList: undefined;
  HabitDetails: { habit: Habit };
};
