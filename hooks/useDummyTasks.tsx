import type { Task } from "@/types/Task";
import { generateTasks } from "@/utils/habits";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDummyHabbits } from "./useDummyHabits";

interface Context {
  tasks: Task[];
  changeIsDone: (id: Task["id"], isDone: boolean) => void;
}

const context = createContext<Context>({
  tasks: [],
  changeIsDone: () => {},
});

const { Provider } = context;

export const useDummyTasks = () => useContext(context);

export const DummyTasksProvider = ({ children }: { children: ReactNode }) => {
  const { habits } = useDummyHabbits();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks((tasks) => generateTasks(habits, tasks));
  }, [habits]);

  const changeIsDone = (id: any, isDone: boolean) => {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const task = newTasks.find((task) => task.id === id);
      if (!task) {
        return tasks;
      }

      if (task) {
        task.isDone = isDone;
      }

      return newTasks;
    });
  };

  const value = useMemo<Context>(
    () => ({
      tasks,
      changeIsDone,
    }),
    [tasks],
  );

  return <Provider value={value}>{children}</Provider>;
};