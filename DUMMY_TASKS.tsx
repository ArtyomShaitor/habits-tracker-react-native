import type { Habit } from "@/types/Task";
import type { Daily, Weekly } from "@/types/Dates";
import { uuid } from "@/utils/uuid";

export const DUMMY_HABITS: Habit[] = [
  {
    id: uuid(),
    name: "Make reservation",
    schedule: {
      type: "single",
      date: {
        date: "2024-03-01",
        time: "13:00",
      },
    },
  },
  {
    id: uuid(),
    name: "Feed the dog in the morning",
    schedule: {
      type: "daily",
      time: "09:00",
    } as Daily,
  },
  {
    id: uuid(),
    name: "Do groceries",
    schedule: {
      type: "weekly",
      dates: ["thu"],
    } as Weekly,
  },
];