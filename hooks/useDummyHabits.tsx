import { DUMMY_HABITS } from "@/DUMMY_TASKS";
import type { Habit } from "@/types/Task";
import { createHabit } from "@/utils/habits";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface Context {
  habits: Habit[];
  addHabit: (name: Habit["name"]) => Habit;
  removeHabit: (id: Habit["id"]) => void;
  updateHabit: (id: Habit["id"], name: Habit["name"]) => void;
}

const context = createContext<Context>({
  habits: [],
  addHabit: () => ({}) as Habit,
  removeHabit: () => {},
  updateHabit: () => {},
});

const { Provider } = context;

export const useDummyHabbits = () => useContext(context);

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

  const value = useMemo<Context>(
    () => ({
      habits,
      addHabit,
      removeHabit,
      updateHabit,
    }),
    [habits],
  );

  return <Provider value={value}>{children}</Provider>;
};
