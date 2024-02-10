import { TextInput } from "react-native";

interface AddTaskInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export const AddTaskInput = ({
  value,
  onChangeText,
  placeholder,
}: AddTaskInputProps) => {
  return (
    <TextInput
      style={{ fontSize: 16 }}
      className="flex-1 mr-4 flex-row items-center py-0 bg-white px-5 shadow-lg rounded-full"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};
