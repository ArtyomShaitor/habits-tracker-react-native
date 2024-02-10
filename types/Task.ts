export type Task = {
  id: number | string;
  text: string;
  isDone: boolean;
};

type SingleTime = {
  date: Date;
  time: Date;
};

export type Habit = {
  id: string;
  name: string;
  schedule: SingleTime;
};
