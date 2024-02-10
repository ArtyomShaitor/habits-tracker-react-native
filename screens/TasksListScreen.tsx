import { DUMMY_TASKS } from "@/DUMMY_TASKS";
import { AddTaskInput } from "@/components/AddTaskInput";
import { TaskItem } from "@/components/TaskItem";
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

export const TasksListScreen = () => {
  const navigation = useNavigation();
  const [tasks] = useState(DUMMY_TASKS);

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="relative flex-1 pt-5 gap-y-10">
            {/* Header */}
            <View className="px-3">
              <TouchableOpacity
                className="flex-row gap-2 items-center"
                onPress={() => navigation.goBack()}
              >
                <ChevronLeftIcon color="#44403c" />
                <Text className="text-xl text-stone-700 font-bold">
                  Today's Tasks
                </Text>
              </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
              className="flex-col flex-1 px-5 gap-y-4"
              contentContainerStyle={{ rowGap: 16 }}
              data={tasks}
              renderItem={({ item }) => (
                <TaskItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  onPress={() =>
                    navigation.navigate("TaskSettings", { task: item })
                  }
                />
              )}
            />

            <View className="flex-row px-5 bottom-4">
              <AddTaskInput placeholder="Write a task..." />
              <TouchableOpacity className="rounded-full justify-center items-center p-3 bg-orange-500">
                <PlusIcon color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
