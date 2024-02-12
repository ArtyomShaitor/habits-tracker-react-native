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
import { useDummyTasks } from "@/hooks/useDummyTasks";
import { ProgressBar } from "@/components/ProgressBar";
import { useMemo } from "react";
import { CalendarDaysIcon } from "react-native-heroicons/mini";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { tasks, changeIsDone } = useDummyTasks();

  const percent = useMemo(() => {
    if (!tasks.length) {
      return 0;
    }
    return (100 * tasks.filter((task) => task.isDone).length) / tasks.length;
  }, [tasks]);

  const statusEmoji = percent === 0 ? "😴" : percent >= 100 ? "🎉" : "🎯";

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <View className="flex-1 pt-10" style={{ rowGap: 12 }}>
        {/* Header */}
        <View className="flex-col px-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl text-stone-700 font-bold">
              Today's Tasks
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("HabitsList")}>
              <ListBulletIcon color="rgb(249 115 22)" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-1">
            <CalendarDaysIcon color="rgb(214 211 209)" />
            <Text className="text-lg text-stone-300 font-bold">
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View className="flex-1" style={{ rowGap: 12 }}>
          {/* Progress Bar */}
          <View
            className="flex-row px-5 items-center"
            style={{ columnGap: 12 }}
          >
            <View className="flex-1">
              <ProgressBar percent={percent} />
            </View>
            <Text className="text-2xl">{statusEmoji}</Text>
          </View>

          {/* List */}
          <FlatList
            className="flex-col px-5 flex-1"
            contentContainerStyle={{ rowGap: 12 }}
            data={tasks}
            renderItem={({ item }) => (
              <TaskCard
                key={item.id}
                id={item.id}
                text={item.text}
                isDone={item.isDone}
                onPress={(isDone) => changeIsDone(item.id, isDone)}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
