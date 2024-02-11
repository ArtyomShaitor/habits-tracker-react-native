import { Habit } from "./Task";

export type Routes = {
  Home: undefined;
  HabitsList: undefined;
  HabitDetails: { habitId: Habit["id"] };
};
