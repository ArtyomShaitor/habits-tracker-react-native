export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type DateString = string; // "2024-01-01";
type TimeString = string; // "09:00";

export type DateTime = { date: DateString; time?: TimeString };
export type DayTime = {
  day: Day;
  time?: TimeString;
};

export type SingleTime = {
  type: "single";
  date: DateTime;
};

export type Daily = {
  type: "daily";
  time: TimeString;
};

export type Weekly<D extends Day = Day> = {
  type: "weekly";
  dates: D[];
};

export type Weekdays = Weekly<Exclude<Day, "sat" | "sun">>;
export type Weekends = Weekly<Extract<Day, "sat" | "sun">>;
