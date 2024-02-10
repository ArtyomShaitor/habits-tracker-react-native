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

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { tasks, changeIsDone } = useDummyTasks();

  return (
    <SafeAreaView className="flex-1 bg-stone-100">
      <View className="flex-1 pt-5 gap-y-10">
        {/* Header */}
        <View className="flex-row px-5 justify-between items-center">
          <Text className="text-3xl text-stone-700 font-bold">
            Today's Tasks
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("HabitsList")}>
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
              onPress={(isDone) => changeIsDone(item.id, isDone)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
