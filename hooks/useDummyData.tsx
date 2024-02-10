import { DUMMY_TASKS } from '@/DUMMY_TASKS';
import type { Task } from '@/types/Task';
import { Provider, ReactNode, createContext, useMemo, useState } from "react";

interface Context {
  tasks: Task[];
  changeIsDone: (id: Task['id'], isDone: boolean) => void;
  addTask: (text: string) => void;
  removeTask: (id: Task['id']) => void;
}

let id = DUMMY_TASKS.length;

const context = createContext<Context>({
  tasks: DUMMY_TASKS,
  changeIsDone: () => {},
  addTask: () => {},
  removeTask: () => {},
});

const { Provider } = context;

export const DummyTasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const changeIsDone = (id: any, isDone: boolean) => {
    setTasks(tasks => {
      const newTasks = [...tasks];
      const task = newTasks.find(task => task.id === id);
      if (!task) {
        return tasks;
      }

      if (task) {
        task.isDone = isDone;
      }

      return newTasks
    })
  }

  const addTask = (text: string) => {
    setTasks(tasks => [...tasks, { id: ++id, text, isDone: false }])
  }

  const removeTask = (id: Task['id']) => {
    setTasks(tasks => {
      const newTasks = [...tasks];
      const indexToDelete = newTasks.findIndex(task => task.id === id);

      if (indexToDelete < 0) {
        return tasks;
      }

      newTasks.splice(indexToDelete, 1);
      return newTasks;
    })
  }

  const value = useMemo<Context>(() => ({
    tasks,
    changeIsDone,
    addTask,
    removeTask,
  }), [tasks]);

  return (
    <Provider value={value}>
      {children}
    </Provider>
  )
}
