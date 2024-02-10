import { SettingsInput } from "@/components/SettingsInput";
import { useDummyHabbits } from "@/hooks/useDummyHabits";
import { useNavigation } from "@/hooks/useNavigation";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type HabitDetailsProps = NativeStackScreenProps<Routes, "HabitDetails">;

export const HabitDetailsScreen = ({ route }: HabitDetailsProps) => {
  const {
    params: { habit },
  } = route;
  const { name, id } = habit;

  const navigation = useNavigation();
  const { updateHabit } = useDummyHabbits();
  const [input, setInput] = useState(name);

  const saveAndClose = () => {
    updateHabit(id, input);
    navigation.goBack();
  };

  return (
    <View className="flex-1 px-10 pt-5">
      <View className="relative flex-1">
        <TextInput
          style={{ fontSize: 16 }}
          className="flex-row items-center bg-white pl-6 pr-4 py-3 border-[1px] border-stone-200 rounded-xl"
          placeholder="Enter the task name..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity
          onPress={saveAndClose}
          className="w-full absolute bottom-16 rounded-lg justify-center items-center py-4 bg-orange-500"
        >
          <Text className="text-white text-base font-bold">Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
