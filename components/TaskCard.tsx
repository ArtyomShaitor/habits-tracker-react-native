import { Text, View } from "react-native";
import { Checkbox } from "./Checkbox";

interface TaskCardProps {
  id: any;
  text: string;
  isDone?: boolean;
  onPress?: (isDone: boolean) => void;
}

export const TaskCard = ({ text, onPress, isDone }: TaskCardProps) => {
  return (
    <View className="flex-row items-center bg-white px-4 py-3 shadow-sm rounded-xl">
      <View className="mr-4">
        <Checkbox isChecked={isDone} onPress={onPress} />
      </View>
      <Text
        className={`text-lg font-medium
          ${isDone ? "line-through" : ""}
          ${isDone ? "text-stone-300" : "text-stone-800"}
        `}
      >
        {text}
      </Text>
    </View>
  );
};
