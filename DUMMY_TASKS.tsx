import type { Habit } from "@/types/Task";
import type { Daily, Weekly } from "@/types/Dates";
import { uuid } from "@/utils/uuid";

export const DUMMY_HABITS: Habit[] = [
  {
    id: uuid(),
    name: "Make reservation",
    schedule: {
      type: "single",
      date: new Date("2024-02-10 23:00"),
    },
  },
  {
    id: uuid(),
    name: "Feed the dog in the morning",
    schedule: {
      type: "daily",
      time: new Date("2024-02-10 09:00"),
    } as Daily,
  },
  {
    id: uuid(),
    name: "Feed the dog in the evening",
    schedule: {
      type: "daily",
      time: new Date("2024-02-10 19:00"),
    } as Daily,
  },
  {
    id: uuid(),
    name: "Do groceries",
    schedule: {
      type: "weekly",
      time: new Date("2024-02-10 17:00"),
      dates: ["tue", "sat"],
    } as Weekly,
  },
];
