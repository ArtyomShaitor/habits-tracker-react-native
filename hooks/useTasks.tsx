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
import { useHabits } from "./useHabits";
import { DoneTasksStorage } from "@/storage/done-tasks-storage";

interface Context {
  tasks: Task[];
  changeIsDone: (id: Task["id"], isDone: boolean) => void;
  percent: number;
}

const context = createContext<Context>({
  tasks: [],
  changeIsDone: () => {},
  percent: 0,
});

const { Provider } = context;

export const useTasks = () => useContext(context);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { habits } = useHabits();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    updateTasks();

    async function updateTasks() {
      const doneTasksIds = await DoneTasksStorage.getAll();
      setTasks((tasks) => generateTasks(habits, tasks, doneTasksIds));
    }
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

      // Sync with tasks storage
      DoneTasksStorage.sync(
        newTasks.filter((task) => task.isDone).map((_) => _.habbitId),
      );

      return newTasks;
    });
  };

  const percent = useMemo(() => {
    if (!tasks.length) {
      return 0;
    }
    return (100 * tasks.filter((task) => task.isDone).length) / tasks.length;
  }, [tasks]);

  const value = useMemo<Context>(
    () => ({
      tasks,
      changeIsDone,
      percent,
    }),
    [tasks],
  );

  return <Provider value={value}>{children}</Provider>;
};
