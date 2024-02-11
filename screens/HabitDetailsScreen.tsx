import { Button, Input, InputGroup } from "@/components/SettingsInputs";
import { useAlert } from "@/hooks/useAlert";
import { useDummyHabbits, useHabit } from "@/hooks/useDummyHabits";
import { useNavigation } from "@/hooks/useNavigation";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { DeviceEventEmitter, Text, TouchableOpacity, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";
import { CloseProvider } from "@/hooks/useOutsideClick";
import { SingleScheduleSettings } from "@/components/SingleScheduleSettings";
import { RedirectBack } from "@/components/RedirectBack";
import { DailyScheduleSettings } from "@/components/DailyScheduleSettings";
import { WeeklyScheduleSettings } from "@/components/WeeklyScheduleSettings";
import { SCHEDULE_TYPE_NAMES, SCHEDULE_TYPE_OPTIONS } from "@/config";
import { Habit } from "@/types/Task";
import { createDefaultSchedule } from "@/utils/habits";

type HabitDetailsProps = NativeStackScreenProps<Routes, "HabitDetails">;

export const HabitDetailsScreen = ({ route }: HabitDetailsProps) => {
  const {
    params: { habitId },
  } = route;
  const { habit } = useHabit(habitId);

  if (habit === undefined) {
    return <RedirectBack />;
  }

  const { name, id } = habit;

  const navigation = useNavigation();
  const { alert } = useAlert();
  const { updateHabit, removeHabit, updateHabitSchedule } = useDummyHabbits();

  useEffect(() => {
    const unsub = DeviceEventEmitter.addListener(
      "scheduleTypeChanged",
      (checkTypes: Habit["schedule"]["type"][]) => {
        const [newType] = checkTypes;
        const schedule = createDefaultSchedule(newType);

        updateHabitSchedule(habitId, schedule);
      },
    );

    return () => unsub.remove();
  }, []);

  const removeHabitHandler = async () => {
    const isDelete = await alert(
      "Are you sure?",
      `You're going to delete "${name}"`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
        },
      ],
    );

    if (!isDelete) {
      return;
    }
    removeHabit(id);
    // navigation.goBack();
  };

  return (
    <CloseProvider>
      <View className="flex-1 px-10 pt-5">
        <View className="relative flex-1" style={{ rowGap: 16 }}>
          <InputGroup>
            <Input
              value={name}
              onChangeText={(newName) => updateHabit(id, newName)}
              placeholder="Enter the task name..."
            />
            <Button
              onPress={() => {
                navigation.navigate("SelectOption", {
                  headerTitle: "Select schedule type",
                  data: SCHEDULE_TYPE_OPTIONS,
                  eventName: "scheduleTypeChanged",
                  min: 1,
                  max: 1,
                  checked: [habit.schedule.type],
                });
              }}
            >
              {SCHEDULE_TYPE_NAMES[habit.schedule.type]}
            </Button>
          </InputGroup>

          {habit.schedule.type === "single" && (
            <SingleScheduleSettings habitId={id} />
          )}

          {habit.schedule.type === "daily" && (
            <DailyScheduleSettings habitId={id} />
          )}

          {habit.schedule.type === "weekly" && (
            <WeeklyScheduleSettings habitId={id} />
          )}

          <TouchableOpacity
            onPress={removeHabitHandler}
            className="flex-row rounded-lg justify-center items-center py-2 mt-5 gap-x-1"
          >
            <TrashIcon color="rgb(239 68 68)" />
            <Text className="text-red-500 text-base font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CloseProvider>
  );
};
