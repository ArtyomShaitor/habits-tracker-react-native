import { HabitStorage } from "@/storage/habits-storage";
import type { Habit, Schedules } from "@/types/Task";
import { createHabit } from "@/utils/habits";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useSyncedData } from "./useSyncedData";
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

const getInitialHabits = async () => {
  return await HabitStorage.getAll();
};
const onHabitsChange = (newHabits: Habit[]) => {
  HabitStorage.sync(newHabits);
};

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits, refreshHabits] = useSyncedData<Habit[]>(
    [],
    getInitialHabits,
    onHabitsChange,
  );

  // refresh habits and tasks if I re-open the app
  useAppState((appState) => {
    if (appState === "active") {
      refreshHabits();
    }
  });

  const addHabit = useCallback(
    (name: Habit["name"]) => {
      const newHabit = createHabit(name);
      setHabits((oldHabits) => [...oldHabits, newHabit]);
      return newHabit;
    },
    [setHabits],
  );

  const removeHabit = useCallback(
    (id: Habit["id"]) => {
      setHabits((oldHabits) => {
        const newhabits = [...oldHabits];
        const indexToDelete = newhabits.findIndex((task) => task.id === id);

        if (indexToDelete < 0) {
          return oldHabits;
        }

        newhabits.splice(indexToDelete, 1);
        return newhabits;
      });
    },
    [setHabits],
  );

  const updateHabit = useCallback(
    (id: Habit["id"], payload: Partial<Habit>) => {
      setHabits((oldHabits) => {
        const newhabits = [...oldHabits];
        const indexToUpdate = newhabits.findIndex((task) => task.id === id);

        if (indexToUpdate < 0) {
          return oldHabits;
        }

        const habit = oldHabits[indexToUpdate];
        const newHabit = {
          ...habit,
          ...payload,
        } as Habit;
        newhabits.splice(indexToUpdate, 1, newHabit);

        return newhabits;
      });
    },
    [setHabits],
  );

  const updateHabitName = useCallback(
    (id: Habit["id"], name: Habit["name"]) => {
      setHabits((oldHabits) => {
        const newhabits = [...oldHabits];
        const indexToUpdate = newhabits.findIndex((task) => task.id === id);

        if (indexToUpdate < 0) {
          return oldHabits;
        }

        const habit = oldHabits[indexToUpdate];
        const newHabit = {
          ...habit,
          name,
        } as Habit;
        newhabits.splice(indexToUpdate, 1, newHabit);

        return newhabits;
      });
    },
    [setHabits],
  );

  const updateHabitSchedule = useCallback(
    <S extends Schedules>(id: Habit["id"], schedule: S) => {
      setHabits((oldHabits) => {
        const newhabits = [...oldHabits];
        const indexToUpdate = newhabits.findIndex((task) => task.id === id);

        if (indexToUpdate < 0) {
          return oldHabits;
        }

        const habit = oldHabits[indexToUpdate];
        const newHabit = {
          ...habit,
          schedule,
        } as Habit<S>;
        newhabits.splice(indexToUpdate, 1, newHabit);

        return newhabits;
      });
    },
    [setHabits],
  );

  const value = useMemo<Context>(
    () => ({
      habits,
      addHabit,
      removeHabit,
      updateHabitName,
      updateHabitSchedule,
      updateHabit,
    }),
    [
      habits,
      addHabit,
      removeHabit,
      updateHabitName,
      updateHabitSchedule,
      updateHabit,
    ],
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useHabits = () => useContext(context);

export function useHabit(id: Habit["id"]) {
  const habitsContext = useHabits();
  const { habits } = habitsContext;

  const habit = habits.find((habitEl) => habitEl.id === id);

  return { ...habitsContext, habit };
}
