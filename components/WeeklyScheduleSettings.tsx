import { Weekly } from "@/types/Dates";
import { SettingsButton, InputGroup, TimePicker } from "./SettingsInputs";
import { Habit } from "@/types/Task";
import { UseHabit, useHabit } from "@/hooks/useDummyHabits";
import { DeviceEventEmitter } from "react-native";
import { useEffect, useMemo } from "react";
import { NotUndefined } from "@/types/Helpers";
import { DAYS_NAMES, DAYS_OPTIONS } from "@/config";
import { useNavigation } from "@/hooks/useNavigation";
import { CalendarDaysIcon } from "react-native-heroicons/outline";

interface WeeklyScheduleSettingsProps {
  habitId: Habit["id"];
}

export const WeeklyScheduleSettings = ({
  habitId,
}: WeeklyScheduleSettingsProps) => {
  const { habit, updateHabitSchedule } = useHabit(habitId) as UseHabit<Weekly>;
  const navigation = useNavigation();

  const time = useMemo(() => {
    if (!habit) {
      return new Date();
    }
    return habit.schedule.time;
  }, [habit?.schedule.time]);

  const checked = useMemo(() => {
    if (!habit) {
      return [];
    }
    return habit.schedule.dates;
  }, [habit?.schedule.dates]);

  useEffect(() => {
    const unsub = DeviceEventEmitter.addListener("dayschanged", (newDays) => {
      const { schedule: originalSchedule } = habit as NotUndefined<
        typeof habit
      >;
      const schedule: Weekly = {
        ...originalSchedule,
        dates: newDays,
      };

      updateHabitSchedule<Weekly>(habitId, schedule);
    });

    return () => unsub.remove();
  }, []);

  const checkedLabel = useMemo(() => {
    return checked
      .map((day) =>
        checked.length > 2 ? DAYS_NAMES[day].slice(0, 3) : DAYS_NAMES[day],
      )
      .join(", ");
  }, [checked]);

  const updateTime = (newTime: Date) => {
    const { schedule: originalSchedule } = habit as NotUndefined<typeof habit>;
    const schedule: Weekly = {
      ...originalSchedule,
      time: newTime,
    };

    updateHabitSchedule<Weekly>(habitId, schedule);
  };

  return (
    <InputGroup>
      <TimePicker value={time} onChangeDate={updateTime} />
      <SettingsButton
        icon={CalendarDaysIcon}
        onPress={() =>
          navigation.navigate("SelectOption", {
            headerTitle: "Select days",
            data: DAYS_OPTIONS,
            eventName: "dayschanged",
            min: 1,
            checked,
          })
        }
      >
        {checkedLabel}
      </SettingsButton>
    </InputGroup>
  );
};
