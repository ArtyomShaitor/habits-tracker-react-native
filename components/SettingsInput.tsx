import { useNavigation } from "@/hooks/useNavigation";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SettingsInputProps {
  value: string;
  placeholder?: string;
}

export const SettingsInput = ({ value, placeholder }: SettingsInputProps) => {
  const navigation = useNavigation();

  const saveAndClose = () => {
    navigation.goBack();
  };

  return (
    <View className="relative flex-1">
      <TextInput
        style={{ fontSize: 16 }}
        className="flex-row items-center bg-white pl-6 pr-4 py-3 border-[1px] border-stone-200 rounded-xl"
        placeholder={placeholder}
      >
        {value}
      </TextInput>

      <TouchableOpacity
        onPress={saveAndClose}
        className="w-full absolute bottom-16 rounded-lg justify-center items-center py-4 bg-orange-500"
      >
        <Text className="text-white text-base font-bold">Update</Text>
      </TouchableOpacity>
    </View>
  );
};
