import { useAlert } from "@/hooks/useAlert";
import { useDummyHabbits } from "@/hooks/useDummyHabits";
import { useNavigation } from "@/hooks/useNavigation";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/outline";

type HabitDetailsProps = NativeStackScreenProps<Routes, "HabitDetails">;

export const HabitDetailsScreen = ({ route }: HabitDetailsProps) => {
  const {
    params: { habit },
  } = route;
  const { name, id } = habit;

  const navigation = useNavigation();
  const { alert } = useAlert();
  const { updateHabit, removeHabit } = useDummyHabbits();
  const [input, setInput] = useState(name);

  const saveAndClose = () => {
    updateHabit(id, input);
    navigation.goBack();
  };

  const removeHabitHandler = async () => {
    const isDelete = await alert(
      "Are you sure?",
      `You're going to delete "${name}"`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
        },
      ],
    );

    if (!isDelete) {
      return;
    }
    removeHabit(id);
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

        <View className="w-full absolute bottom-16 gap-y-4">
          <TouchableOpacity
            onPress={saveAndClose}
            className=" rounded-lg justify-center items-center py-4 bg-orange-500"
          >
            <Text className="text-white text-base font-bold">Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removeHabitHandler}
            className="flex-row rounded-lg justify-center items-center py-2 gap-x-1"
          >
            <TrashIcon color="rgb(239 68 68)" />
            <Text className="text-red-500 text-base font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
