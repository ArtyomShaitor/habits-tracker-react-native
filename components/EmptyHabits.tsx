import { Colors } from "@/config";
import { Text, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/mini";

export const EmptyHabits = () => {
  return (
    <View className="flex-1 px-5 gap-y-2 pb-10 items-center justify-center">
      <View className="">
        <Text className="text-lg font-bold text-stone-600">
          Add your first habit
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-stone-600">Enter the name and click on </Text>
        <PlusIcon color={Colors.primary} />
      </View>
    </View>
  );
};
