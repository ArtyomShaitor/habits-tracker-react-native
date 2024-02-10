import { TextInput } from "react-native"

interface AddTaskInputProps {
  value?: string;
  placeholder?: string;
}

export const AddTaskInput = ({ value, placeholder }: AddTaskInputProps) => {
  return (
    <TextInput
      style={{ fontSize: 16 }}
      className="flex-1 mr-4 flex-row items-center py-0 bg-white px-5 shadow-sm rounded-full"
      placeholder={placeholder}
    >
      123
    </TextInput>
  )
}
