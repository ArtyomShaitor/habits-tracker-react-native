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

  const time = useMemo(() => {
    if (!habit) {
      return new Date();
    }
    return habit.schedule.time;
  }, [habit?.schedule.time]);

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
