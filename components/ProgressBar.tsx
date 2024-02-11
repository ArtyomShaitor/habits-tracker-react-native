import { View } from "react-native";

export const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <View className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
      <View
        style={{ width: `${percent}%` }}
        className="h-full bg-green-500 rounded-full"
      />
    </View>
  );
};
