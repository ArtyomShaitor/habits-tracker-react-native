import { Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/mini";

interface CheckboxProps {
  isChecked?: boolean;
  onPress?: (isChecked: boolean) => void;
}

export const Checkbox = ({ isChecked, onPress }: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(!isChecked)}
      className="bg-white justify-center items-center w-6 h-6 rounded-lg shadow-sm"
    >
      {isChecked ? <CheckIcon color="" /> : null}
    </TouchableOpacity>
  );
};
