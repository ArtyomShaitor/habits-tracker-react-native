import { HabitStorage } from "@/storage/habits-storage";
import type { Habit, Schedules } from "@/types/Task";
import { createHabit } from "@/utils/habits";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { useData } from "./useData";
import { useAppState } from "./useAppState";

interface Context {
  habits: Habit[];
  addHabit: (name: Habit["name"]) => Habit;
  removeHabit: (id: Habit["id"]) => void;
  updateHabit: (id: Habit["id"], payload: Partial<Habit>) => void;
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
  updateHabit: () => {},
  updateHabitName: () => {},
  updateHabitSchedule: () => {},
});

const { Provider } = context;

export const useHabits = () => useContext(context);

export function useHabit(id: Habit["id"]) {
  const habitsContext = useHabits();
  const { habits } = habitsContext;

  const habit = habits.find((habit) => habit.id === id);

  return { ...habitsContext, habit };
}

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits, refreshHabits] = useData<Habit[]>(
    [],
    async () => {
      return await HabitStorage.getAll();
    },
    (newHabits) => {
      HabitStorage.sync(newHabits);
    },
  );

  // refresh habits and tasks if I re-open the app
  useAppState((appState) => {
    if (appState === "active") {
      refreshHabits();
    }
  });

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

  const updateHabit = (id: Habit["id"], payload: Partial<Habit>) => {
    setHabits((habits) => {
      const newhabits = [...habits];
      const indexToUpdate = newhabits.findIndex((task) => task.id === id);

      if (indexToUpdate < 0) {
        return habits;
      }

      const habit = habits[indexToUpdate];
      const newHabit = {
        ...habit,
        ...payload,
      } as Habit;
      newhabits.splice(indexToUpdate, 1, newHabit);

      return newhabits;
    });
  };

  const updateHabitName = (id: Habit["id"], name: Habit["name"]) => {
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
      updateHabitName,
      updateHabitSchedule,
      updateHabit,
    }),
    [habits],
  );

  return <Provider value={value}>{children}</Provider>;
};
