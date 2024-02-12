import { Text, View } from "react-native";
import { ListBulletIcon } from "react-native-heroicons/mini";

export const EmptyTasks = () => {
  return (
    <View className="flex-1 px-5 gap-y-2 pb-10 items-center justify-center">
      <Text className="text-lg font-bold text-stone-600">
        You haven't add any habits yet
      </Text>
      <View className="px-10">
        <Text className="text-stone-600 text-center">
          Please start by clicking on the{" "}
          <ListBulletIcon
            style={{ marginBottom: -5 }}
            color="rgb(249 115 22)"
          />
          {"\n"}
          in the top-right corner
        </Text>
      </View>
    </View>
  );
};
