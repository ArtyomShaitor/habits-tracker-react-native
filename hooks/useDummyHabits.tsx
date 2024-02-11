import { DUMMY_HABITS } from "@/DUMMY_TASKS";
import type { Habit, Schedules } from "@/types/Task";
import { createHabit } from "@/utils/habits";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface Context {
  habits: Habit[];
  addHabit: (name: Habit["name"]) => Habit;
  removeHabit: (id: Habit["id"]) => void;
  updateHabitName: (id: Habit["id"], name: Habit["name"]) => void;
  updateHabitSchedule: <S extends Schedules>(
    id: Habit["id"],
    schedule: S,
  ) => void;
}

export type UseHabit<S extends Schedules> = Context & {
  habit: Habit<S> | undefined;
};

const context = createContext<Context>({
  habits: [],
  addHabit: () => ({}) as Habit,
  removeHabit: () => {},
  updateHabitName: () => {},
  updateHabitSchedule: () => {},
});

const { Provider } = context;

export const useDummyHabbits = () => useContext(context);

export function useHabit(id: Habit["id"]) {
  const habitsContext = useDummyHabbits();
  const { habits } = habitsContext;

  const habit = habits.find((habit) => habit.id === id);

  return { ...habitsContext, habit };
}

export const DummyHabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState(() => DUMMY_HABITS);

  const addHabit = (name: Habit["name"]) => {
    const newHabit = createHabit(name);
    setHabits((habits) => [...habits, newHabit]);
    return newHabit;
  };

  const removeHabit = (id: Habit["id"]) => {
    setHabits((habits) => {
      const newhabits = [...habits];
      const indexToDelete = newhabits.findIndex((task) => task.id === id);

      if (indexToDelete < 0) {
        return habits;
      }

      newhabits.splice(indexToDelete, 1);
      return newhabits;
    });
  };

  const updateHabit = (id: Habit["id"], name: Habit["name"]) => {
    setHabits((habits) => {
      const newhabits = [...habits];
      const indexToUpdate = newhabits.findIndex((task) => task.id === id);

      if (indexToUpdate < 0) {
        return habits;
      }

      const habit = habits[indexToUpdate];
      const newHabit = {
        ...habit,
        name,
      } as Habit;
      newhabits.splice(indexToUpdate, 1, newHabit);

      return newhabits;
    });
  };

  const updateHabitSchedule = <S extends Schedules>(
    id: Habit["id"],
    schedule: S,
  ) => {
    setHabits((habits) => {
      const newhabits = [...habits];
      const indexToUpdate = newhabits.findIndex((task) => task.id === id);

      if (indexToUpdate < 0) {
        return habits;
      }

      const habit = habits[indexToUpdate];
      const newHabit = {
        ...habit,
        schedule,
      } as Habit<S>;
      newhabits.splice(indexToUpdate, 1, newHabit);

      return newhabits;
    });
  };

  const value = useMemo<Context>(
    () => ({
      habits,
      addHabit,
      removeHabit,
      updateHabitName: updateHabit,
      updateHabitSchedule,
    }),
    [habits],
  );

  return <Provider value={value}>{children}</Provider>;
};
