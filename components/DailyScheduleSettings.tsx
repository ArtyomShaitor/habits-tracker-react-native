import { Daily } from "@/types/Dates";
import { InputGroup, TimePicker } from "./SettingsInputs";
import { Habit } from "@/types/Task";
import { UseHabit, useHabit } from "@/hooks/useHabits";
import { useMemo } from "react";
import { NotUndefined } from "@/types/Helpers";

interface DailyScheduleSettingsProps {
  habitId: Habit["id"];
}

export const DailyScheduleSettings = ({
  habitId,
}: DailyScheduleSettingsProps) => {
  const { habit, updateHabitSchedule } = useHabit(habitId) as UseHabit<Daily>;

  const habitTime = habit?.schedule.time;

  const time = useMemo(() => {
    if (!habitTime) {
      return new Date();
    }
    return habitTime;
  }, [habitTime]);

  const updateTime = (newTime: Date) => {
    const { schedule: originalSchedule } = habit as NotUndefined<typeof habit>;
    const schedule: Daily = {
      ...originalSchedule,
      time: newTime,
    };

    updateHabitSchedule<Daily>(habitId, schedule);
  };

  return (
    <InputGroup>
      <TimePicker value={time} onChangeDate={updateTime} />
    </InputGroup>
  );
};
