import { Habit, Task } from "@/types/Task";
import { isToday } from "./time";
import { uuid } from "@/utils/uuid";

export const createTask = (text: string, habbitId: Habit["id"]): Task => ({
  id: uuid(),
  habbitId,
  text,
  isDone: false,
});

export const createHabit = (name: string): Habit => {
  const time = new Date();
  time.setMinutes(time.getMinutes() + 60);

  return {
    id: uuid(),
    name,
    schedule: {
      type: "daily",
      time,
    },
  };
};

export const generateTasks = (habits: Habit[], oldTasks: Task[]): Task[] => {
  const tasks: Task[] = [];

  habits.forEach((habit) => {
    const { schedule } = habit;
    let isNeedToCreate = false;

    if (schedule.type === "single") {
      const { date } = schedule;
      if (isToday(date)) {
        isNeedToCreate = true;
      }
    }

    if (schedule.type === "daily") {
      isNeedToCreate = true;
    }

    if (schedule.type === "weekly") {
      const { dates } = schedule;
      if (dates.some((day) => isToday(day))) {
        isNeedToCreate = true;
      }
    }

    if (isNeedToCreate) {
      const existingTask = oldTasks.find((task) => task.habbitId === habit.id);
      let task = createTask(habit.name, habit.id);
      if (existingTask) {
        const { text } = task;
        task = { ...existingTask, text } as Task;
      }
      tasks.push(task);
    }
  });

  return tasks;
};
