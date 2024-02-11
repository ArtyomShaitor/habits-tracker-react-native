export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type SingleTime = {
  type: "single";
  date: Date;
};

export type Daily = {
  type: "daily";
  time: Date;
};

export type Weekly<D extends Day = Day> = {
  type: "weekly";
  time: Date;
  dates: D[];
};

export type Weekdays = Weekly<Exclude<Day, "sat" | "sun">>;
export type Weekends = Weekly<Extract<Day, "sat" | "sun">>;
