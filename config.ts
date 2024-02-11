import { Day } from "./types/Dates";

export const DAYS_OPTIONS: { name: string; value: Day }[] = [
  { name: "Monday", value: "mon" },
  { name: "Tuesday", value: "tue" },
  { name: "Wednesday", value: "wed" },
  { name: "Thursday", value: "thu" },
  { name: "Friday", value: "fri" },
  { name: "Saturday", value: "sat" },
  { name: "Sunday", value: "sun" },
];

export const SCHEDULE_TYPE_OPTIONS = [
  { name: "Single", value: "single" },
  { name: "Daily", value: "daily" },
  { name: "Weekly", value: "weekly" },
];

export const DAYS_NAMES: { [key: string]: string } = DAYS_OPTIONS.reduce(
  (acc, { name, value }) => ({
    ...acc,
    [value]: name,
  }),
  {},
);

export const SCHEDULE_TYPE_NAMES: { [key: string]: string } =
  SCHEDULE_TYPE_OPTIONS.reduce(
    (acc, { name, value }) => ({
      ...acc,
      [value]: name,
    }),
    {},
  );
