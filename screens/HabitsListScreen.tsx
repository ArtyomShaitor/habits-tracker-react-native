import { AddTaskInput } from "@/components/AddTaskInput";
import { EmptyHabits } from "@/components/EmptyHabits";
import { TaskItem } from "@/components/TaskItem";
import { useHabits } from "@/hooks/useHabits";
import { useNavigation } from "@/hooks/useNavigation";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/outline";
import { Colors } from "@/config";

const Content = () => {
  const navigation = useNavigation();
  const { habits } = useHabits();

  return (
    <FlatList
      className="flex-col flex-1 px-5 py-1 gap-y-4"
      contentContainerStyle={{
        rowGap: 16,
        paddingBottom: 90,
      }}
      data={habits}
      renderItem={({ item: habit }) => (
        <TaskItem
          key={habit.id}
          id={habit.id}
          text={habit.name}
          onPress={() =>
            navigation.navigate("HabitDetails", { habitId: habit.id })
          }
        />
      )}
    />
  );
};

export const HabitsListScreen = () => {
  const navigation = useNavigation();
  const [habitName, setHabitName] = useState("");
  const { habits, addHabit } = useHabits();

  const addNewHabit = (name: string) => {
    if (!name.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Keyboard.dismiss();
    const habit = addHabit(name);
    setHabitName("");

    navigation.navigate("HabitDetails", { habitId: habit.id });
  };

  const isNoHabits = habits.length < 1;

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="relative flex-1 pt-5 gap-y-10">
            {/* Header */}
            <View className="relative flex-row px-3 justify-center items-center">
              <TouchableOpacity
                className="left-3 absolute p-1 items-center"
                onPress={() => navigation.goBack()}
              >
                <View className="flex-row items-center gap-x-1">
                  <ChevronLeftIcon color={Colors.primary} />
                  <Text className="text-lg text-orange-500">Back</Text>
                </View>
              </TouchableOpacity>
              <Text className="text-lg text-stone-700 font-bold">
                My Habits
              </Text>
            </View>

            {/* List or Empty screen */}
            {isNoHabits ? (
              <View className="flex-1">
                <EmptyHabits />
              </View>
            ) : (
              <View className="flex-1">
                <Content />
              </View>
            )}

            <View className="absolute flex-row px-5 bottom-0 pb-4 pt-5">
              <AddTaskInput
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Write a task..."
                onSubmit={() => addNewHabit(habitName)}
              />
              <TouchableOpacity
                className="rounded-full justify-center items-center p-3 bg-orange-500"
                onPress={() => addNewHabit(habitName)}
              >
                <PlusIcon color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
