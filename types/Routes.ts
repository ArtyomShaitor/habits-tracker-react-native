import { Habit } from "./Task";

export type Routes = {
  Home: undefined;
  HabitsList: undefined;
  HabitDetails: { habitId: Habit["id"] };
  SelectOption: {
    data: { name: string; value: string | number }[];
    eventName: string;
    checked?: (string | number)[];
    min?: number;
    max?: number;
    headerTitle?: string;
  };
};
