import { Text, View } from "react-native";

export const NoTasksForToday = () => {
  return (
    <View className="flex-1 px-5 gap-y-2 pb-10 items-center justify-center">
      <Text className="text-lg font-bold text-stone-600">
        No tasks for today 🌴
      </Text>
    </View>
  );
};
