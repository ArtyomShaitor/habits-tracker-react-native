import { SettingsButton, Input, InputGroup } from "@/components/SettingsInputs";
import { useAlert } from "@/hooks/useAlert";
import { useHabits, useHabit } from "@/hooks/useHabits";
import { useNavigation, useNavigationOption } from "@/hooks/useNavigation";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Button,
  DeviceEventEmitter,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ArrowPathIcon, TrashIcon } from "react-native-heroicons/outline";
import { CloseProvider } from "@/hooks/useOutsideClick";
import { SingleScheduleSettings } from "@/components/SingleScheduleSettings";
import { RedirectBack } from "@/components/RedirectBack";
import { DailyScheduleSettings } from "@/components/DailyScheduleSettings";
import { WeeklyScheduleSettings } from "@/components/WeeklyScheduleSettings";
import { SCHEDULE_TYPE_NAMES, SCHEDULE_TYPE_OPTIONS } from "@/config";
import { Habit } from "@/types/Task";
import { createDefaultSchedule } from "@/utils/habits";

type HabitDetailsScreenProps = NativeStackScreenProps<Routes, "HabitDetails">;

export const HabitDetails = ({ habit }: { habit: Habit }) => {
  const [originalHabitSnapshot] = useState(habit);
  const { name, id } = habit;

  const navigation = useNavigation();
  const { alert } = useAlert();
  const { updateHabit, removeHabit } = useHabits();

  const onCancel = () => {
    const { name, schedule } = originalHabitSnapshot;
    updateHabit(id, {
      name,
      schedule,
    });
    navigation.goBack();
  };

  useNavigationOption({
    headerLeft: () => {
      return <Button title="Cancel" onPress={onCancel} />;
    },
    headerRight: () => {
      return <Button title="Done" onPress={() => navigation.goBack()} />;
    },
  });

  useEffect(() => {
    const unsub = DeviceEventEmitter.addListener(
      "scheduleTypeChanged",
      (checkTypes: Habit["schedule"]["type"][]) => {
        const [newType] = checkTypes;
        const schedule = createDefaultSchedule(newType);

        updateHabit(id, { schedule });
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
  };

  return (
    <CloseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 px-5 pt-5">
          <View
            className="relative flex-1 flex-col items-center"
            style={{ rowGap: 16 }}
          >
            <View className="w-full" style={{ rowGap: 16 }}>
              <InputGroup>
                <Input
                  value={name}
                  onChangeText={(newName) => updateHabit(id, { name: newName })}
                  placeholder="Enter the task name..."
                />
                <SettingsButton
                  icon={ArrowPathIcon}
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
                </SettingsButton>
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
            </View>

            <TouchableOpacity
              onPress={removeHabitHandler}
              className="flex-row rounded-lg justify-center items-center px-6 mt-3 gap-x-1"
            >
              <TrashIcon color="rgb(239 68 68)" width={20} strokeWidth={2} />
              <Text className="text-red-500 text-base font-bold">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CloseProvider>
  );
};

export const HabitDetailsScreen = ({ route }: HabitDetailsScreenProps) => {
  const {
    params: { habitId },
  } = route;
  const { habit } = useHabit(habitId);

  if (habit === undefined) {
    return <RedirectBack />;
  }

  return <HabitDetails habit={habit} />;
};
