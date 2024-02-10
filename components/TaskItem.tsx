import { Text, TouchableOpacity, View } from "react-native"
import { ChevronRightIcon } from "react-native-heroicons/outline";

interface TaskItemProps {
  id: any;
  text: string;
  onPress?: () => void;
}

export const TaskItem = ({ text, onPress }: TaskItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row justify-between items-center bg-white px-4 py-3 shadow-sm rounded-xl"
    >
      <Text
        className="text-lg font-medium text-stone-800"
      >
        {text}
      </Text>
      <ChevronRightIcon color="#44403c" />
    </TouchableOpacity>
  )
}
