import { Weekly } from "@/types/Dates";
import { SettingsButton, InputGroup, TimePicker } from "./SettingsInputs";
import { Habit } from "@/types/Task";
import { UseHabit, useHabit } from "@/hooks/useHabits";
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

  const habitTime = habit?.schedule.time;
  const habitDates = habit?.schedule.dates;

  const time = useMemo(() => {
    if (!habitTime) {
      return new Date();
    }
    return habitTime;
  }, [habitTime]);

  const checked = useMemo(() => {
    if (!habitDates) {
      return [];
    }
    return habitDates;
  }, [habitDates]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
