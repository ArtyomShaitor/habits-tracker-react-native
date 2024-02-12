import { Habit, Task } from "@/types/Task";
import { isToday } from "./time";
import { uuid } from "@/utils/uuid";
import { Daily, SingleTime, Weekly } from "@/types/Dates";

export const createTask = (text: string, habbitId: Habit["id"]): Task => ({
  id: uuid(),
  habbitId,
  text,
  isDone: false,
});

export const createDefaultSchedule = (
  type: Habit["schedule"]["type"],
): Habit["schedule"] => {
  if (type === "single") {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return {
      type: "single",
      date: new Date(),
    } as SingleTime;
  }

  if (type === "daily") {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 60);

    return {
      type: "daily",
      time,
    } as Daily;
  }

  if (type === "weekly") {
    const time = new Date();
    time.setMinutes(time.getMinutes() + 60);

    return {
      type: "weekly",
      dates: ["mon"],
      time,
    } as Weekly;
  }

  throw new Error(`There is no "${type}" schedule type`);
};

export const createHabit = (name: string): Habit => {
  const time = new Date();
  time.setMinutes(time.getMinutes() + 60);

  const schedule = createDefaultSchedule("daily");

  return {
    id: uuid(),
    name,
    schedule,
  };
};

export const generateTasks = (
  habits: Habit[],
  oldTasks: Task[],
  doneTasksIds: Task["id"][],
): Task[] => {
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

      task.isDone = doneTasksIds.includes(task.habbitId);

      tasks.push(task);
    }
  });

  return tasks;
};
