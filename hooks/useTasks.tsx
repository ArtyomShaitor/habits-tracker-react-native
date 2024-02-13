import type { Task } from "@/types/Task";
import { generateTasks } from "@/utils/habits";
import {
  ReactNode,
  createContext,
  useCallback,
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
      setTasks((oldTasks) => generateTasks(habits, oldTasks, doneTasksIds));
    }
  }, [habits]);

  const changeIsDone = useCallback(
    (id: any, isDone: boolean) => {
      setTasks((oldTasks) => {
        const newTasks = [...oldTasks];
        const task = newTasks.find((newTask) => newTask.id === id);
        if (!task) {
          return oldTasks;
        }

        if (task) {
          task.isDone = isDone;
        }

        // Sync with tasks storage
        DoneTasksStorage.sync(
          newTasks.filter((newTask) => newTask.isDone).map((_) => _.habbitId),
        );

        return newTasks;
      });
    },
    [setTasks],
  );

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
    [tasks, percent, changeIsDone],
  );

  return <Provider value={value}>{children}</Provider>;
};
