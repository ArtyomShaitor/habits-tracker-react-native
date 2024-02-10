import { SettingsInput } from "@/components/SettingsInput";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native"

type TaskSettingsScreenProps = NativeStackScreenProps<Routes, 'TaskSettings'>;

export const TaskSettingsScreen = ({ route }: TaskSettingsScreenProps) => {
  const { params: { task } } = route;
  const { text } = task;

  return (
    <View className="flex-1 px-10 pt-5">
      <SettingsInput value={text} placeholder="Enter the task name..." />
    </View>
  )
}
