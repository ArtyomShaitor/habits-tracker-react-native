import { SingleTime } from "@/types/Dates";
import { DatePicker, InputGroup, TimePicker } from "./SettingsInputs";
import { useMemo } from "react";
import { Habit } from "@/types/Task";
import { UseHabit, useHabit } from "@/hooks/useHabits";
import { NotUndefined } from "@/types/Helpers";

interface SingleScheduleSettingsProps {
  habitId: Habit["id"];
}

export const SingleScheduleSettings = ({
  habitId,
}: SingleScheduleSettingsProps) => {
  const { habit, updateHabitSchedule } = useHabit(
    habitId,
  ) as UseHabit<SingleTime>;

  const habitDate = habit?.schedule.date;

  const date = useMemo(() => {
    if (!habitDate) {
      return new Date();
    }
    return habitDate;
  }, [habitDate]);

  const updateDate = (newDate: Date) => {
    const { schedule: originalSchedule } = habit as NotUndefined<typeof habit>;
    const schedule: SingleTime = {
      ...originalSchedule,
      date: newDate,
    };

    updateHabitSchedule<SingleTime>(habitId, schedule);
  };

  return (
    <InputGroup>
      <DatePicker value={date} onChangeDate={updateDate} />
      <TimePicker value={date} onChangeDate={updateDate} />
    </InputGroup>
  );
};
