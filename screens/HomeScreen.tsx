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
import { useTasks } from "@/hooks/useTasks";
import { ProgressBar } from "@/components/ProgressBar";
import { CalendarDaysIcon } from "react-native-heroicons/mini";
import { useHabits } from "@/hooks/useHabits";
import { EmptyTasks } from "@/components/EmptyTasks";
import { NoTasksForToday } from "@/components/NoTasksForToday";
import { getNow } from "@/utils/time";
import { Colors } from "@/config";

const Content = () => {
  const { tasks, changeIsDone, percent } = useTasks();
  const statusEmoji = percent === 0 ? "😴" : percent >= 100 ? "🎉" : "🎯";

  return (
    <View className="flex-1" style={{ rowGap: 8 }}>
      {/* Progress Bar */}
      <View className="flex-row px-5 items-center" style={{ columnGap: 12 }}>
        <View className="flex-1">
          <ProgressBar percent={percent} />
        </View>
        <Text className="text-2xl">{statusEmoji}</Text>
      </View>

      {/* List */}
      <FlatList
        className="flex-col px-5 py-1 flex-1"
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
  );
};

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { habits } = useHabits();
  const { tasks } = useTasks();

  const isNoHabits = habits.length < 1;
  const isNoTasks = tasks.length < 1;

  const isNoTasksForToday = !isNoHabits && isNoTasks;

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <View className="flex-1 pt-10" style={{ rowGap: 12 }}>
        {/* Header */}
        <View className="flex-col px-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-3xl text-stone-700 font-bold">
              Today's Tasks
            </Text>
            <TouchableOpacity
              className="pl-3 py-2"
              onPress={() => navigation.navigate("HabitsList")}
            >
              <ListBulletIcon
                color={Colors.primary}
                width={30}
                height={30}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-1">
            <CalendarDaysIcon color="rgb(214 211 209)" />
            <Text className="text-lg text-stone-300 font-bold">
              {getNow().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {isNoHabits ? (
          <EmptyTasks />
        ) : isNoTasksForToday ? (
          <NoTasksForToday />
        ) : (
          <Content />
        )}
      </View>
    </SafeAreaView>
  );
};
