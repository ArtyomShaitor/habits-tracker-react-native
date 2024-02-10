import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ListBulletIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@/hooks/useNavigation";
import { TaskCard } from "@/components/TaskCard";
import { useState } from "react";
import { DUMMY_TASKS } from "@/DUMMY_TASKS";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const updateTask = (id: any, isDone: boolean) => {
    setTasks((tasks) => {
      const newTasks = [...tasks];
      const task = newTasks.find((task) => task.id === id);
      if (!task) {
        return tasks;
      }

      if (task) {
        task.isDone = isDone;
      }

      return newTasks;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <View className="flex-1 pt-5 gap-y-10">
        {/* Header */}
        <View className="flex-row px-5 justify-between items-center">
          <Text className="text-3xl text-stone-700 font-bold">
            Today's Tasks
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("TasksList")}>
            <ListBulletIcon color="#44403c" />
          </TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          className="flex-col flex-1 px-5  gap-y-4"
          contentContainerStyle={{ rowGap: 16 }}
          data={tasks}
          renderItem={({ item }) => (
            <TaskCard
              key={item.id}
              id={item.id}
              text={item.text}
              isDone={item.isDone}
              onPress={(isDone) => updateTask(item.id, isDone)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
