import {
  StyleProp,
  TextInput,
  TextStyle,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDateString, getTimeString } from "@/utils/time";
import { useOutsideClose } from "@/hooks/useOutsideClose";

interface InputProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

// TODO: refactor the rounding checking, I bet there is a way to do it
// using only NativeWind approach
const groupContext = createContext({ isRoundTop: true, isRoundBottom: true });
const useGroupClassname = () => {
  const { isRoundTop, isRoundBottom } = useContext(groupContext);
  const roundTopClassname = isRoundTop ? "rounded-t-xl" : "";
  const roundBottomClassname = isRoundBottom ? "rounded-b-xl" : "";
  const removeBorderTopClassname = isRoundTop ? "" : "border-t-0";

  return `${removeBorderTopClassname} ${roundTopClassname} ${roundBottomClassname}`.trim();
};
const { Provider } = groupContext;

export const InputGroup = ({ children }: { children: ReactNode }) => {
  const lastIndex = Children.count(children) - 1;
  return (
    <View>
      {Children.map(children, (child, i) => (
        <Provider
          key={i}
          value={{ isRoundTop: i === 0, isRoundBottom: i === lastIndex }}
        >
          {child}
        </Provider>
      ))}
    </View>
  );
};

export const Input = ({
  value,
  onChangeText,
  placeholder,
  style,
}: InputProps) => {
  const groupClassname = useGroupClassname();

  return (
    <TextInput
      style={[{ fontSize: 16 }, style]}
      className={`text-stone-800 flex-row items-center bg-white px-6 py-3 border-[1px] border-stone-200 ${groupClassname}`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

interface DatePickerProps {
  value: Date;
  onChangeDate?: (date: Date) => void;
}

export const DatePicker = ({ value, onChangeDate }: DatePickerProps) => {
  const groupClassname = useGroupClassname();
  const [showPicker, setShowPicker] = useState(false);

  useOutsideClose(() => setShowPicker(false));

  return (
    <TouchableOpacity
      onPress={() => setShowPicker(true)}
      className={`flex-col bg-white px-6 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <Text className="text-base text-stone-800">{getDateString(value)}</Text>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          onChange={(_, date) => date && onChangeDate?.(date)}
        />
      )}
    </TouchableOpacity>
  );
};

interface TimePickerProps {
  value: Date;
  onChangeDate?: (date: Date) => void;
}

export const TimePicker = ({ value, onChangeDate }: TimePickerProps) => {
  const groupClassname = useGroupClassname();
  const [showPicker, setShowPicker] = useState(false);

  useOutsideClose(() => setShowPicker(false));

  return (
    <TouchableOpacity
      onPress={() => setShowPicker(true)}
      className={`flex-col bg-white px-6 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <Text className="text-base text-stone-800">{getTimeString(value)}</Text>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="time"
          display="spinner"
          onChange={(_, date) => date && onChangeDate?.(date)}
        />
      )}
    </TouchableOpacity>
  );
};
