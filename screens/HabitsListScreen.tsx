import { AddTaskInput } from "@/components/AddTaskInput";
import { TaskItem } from "@/components/TaskItem";
import { useDummyHabbits } from "@/hooks/useDummyHabits";
import { useNavigation } from "@/hooks/useNavigation";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ChevronLeftIcon, PlusIcon } from "react-native-heroicons/outline";

export const HabitsListScreen = () => {
  const navigation = useNavigation();
  const [habitName, setHabitName] = useState("");
  const { habits, addHabit } = useDummyHabbits();

  const addNewHabit = (name: string) => {
    Keyboard.dismiss();
    addHabit(name);
    setHabitName("");
  };

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
                <ChevronLeftIcon color="#44403c" />
              </TouchableOpacity>
              <Text className="text-xl text-stone-700 font-bold">
                My Habits
              </Text>
            </View>

            {/* List */}
            <FlatList
              className="flex-col flex-1 px-5 gap-y-4"
              contentContainerStyle={{ rowGap: 16 }}
              data={habits}
              renderItem={({ item }) => (
                <TaskItem
                  key={item.id}
                  id={item.id}
                  text={item.name}
                  onPress={() =>
                    navigation.navigate("HabitDetails", { task: item })
                  }
                />
              )}
            />

            <View className="flex-row px-5 bottom-4">
              <AddTaskInput
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Write a task..."
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
