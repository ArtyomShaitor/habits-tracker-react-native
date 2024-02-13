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
  useEffect,
  useState,
} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDateString, getTimeString } from "@/utils/time";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  CheckIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  ClockIcon,
} from "react-native-heroicons/outline";
import type { SvgProps } from "react-native-svg";

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
}: {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}) => {
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

export const DatePicker = ({
  value,
  onChangeDate,
}: {
  value: Date;
  onChangeDate?: (date: Date) => void;
}) => {
  const groupClassname = useGroupClassname();
  const [showPicker, setShowPicker] = useState(false);

  useOutsideClick(() => setShowPicker(false));

  return (
    <TouchableOpacity
      onPress={() => setShowPicker(!showPicker)}
      className={`flex-col bg-white px-5 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <View className="flex-row gap-x-2">
        <CalendarDaysIcon width={22} />
        <Text className="text-base text-stone-800">{getDateString(value)}</Text>
      </View>

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

export const TimePicker = ({
  value,
  onChangeDate,
}: {
  value: Date;
  onChangeDate?: (date: Date) => void;
}) => {
  const groupClassname = useGroupClassname();
  const [showPicker, setShowPicker] = useState(false);

  useOutsideClick(() => setShowPicker(false));

  return (
    <TouchableOpacity
      onPress={() => setShowPicker(!showPicker)}
      className={`flex-col bg-white px-5 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <View className="flex-row gap-x-2">
        <ClockIcon width={22} />
        <Text className="text-base font- text-stone-800">
          {getTimeString(value)}
        </Text>
      </View>
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

export const MultiSelectOption = ({
  children,
  isChecked,
  onPress,
}: {
  children: ReactNode;
  isChecked?: boolean;
  onPress?: () => void;
}) => {
  const groupClassname = useGroupClassname();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center bg-white px-6 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <Text className="text-base text-stone-800">{children}</Text>
      {isChecked && <CheckIcon color="black" width={18} />}
    </TouchableOpacity>
  );
};

export const SettingsButton = ({
  onPress,
  icon: Icon,
  children,
}: {
  onPress?: () => void;
  children: ReactNode;
  icon?: (props: SvgProps) => React.JSX.Element;
}) => {
  const groupClassname = useGroupClassname();
  const paddingLeft = Icon ? "pl-5" : "pl-6";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center bg-white ${paddingLeft} pr-3 py-3 border-[1px] border-stone-200 ${groupClassname}`}
    >
      <View className="flex-1 flex-row gap-x-2">
        {Icon && <Icon width={22} />}
        <Text className="text-base text-stone-800">{children}</Text>
      </View>
      <View>
        <ChevronRightIcon color="#44403c" />
      </View>
    </TouchableOpacity>
  );
};

export const Select = ({
  data,
  checked = [],
  onChange,
  min = 0,
  max = data.length,
}: {
  data: { name: string; value: string | number }[];
  checked?: (string | number)[];
  onChange?: (checked: (string | number)[]) => void;
  min?: number;
  max?: number;
}) => {
  const [_checked, setChecked] =
    useState<(typeof data)[number]["value"][]>(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const [dataWithIndexes] = useState(() => data.map((item) => item.value));

  const updateChecked = (
    value: (typeof data)[number]["value"],
    isChecked: boolean,
  ) => {
    let newState;

    if (max === min && max === 1) {
      newState = [value];
    } else if (isChecked) {
      const newChecked = [..._checked, value];
      newState = dataWithIndexes.filter((v) => newChecked.includes(v));
    } else {
      newState = _checked.filter((v) => v !== value);
    }

    if (newState.length < min || newState.length > max) {
      newState = _checked;
    }

    if (checked) {
      onChange?.(newState);
    }

    setChecked(newState);
  };

  return (
    <InputGroup>
      {data.map(({ name, value }) => {
        const isChecked = _checked.includes(value);

        return (
          <MultiSelectOption
            key={value}
            onPress={() => updateChecked(value, !isChecked)}
            isChecked={isChecked}
          >
            {name}
          </MultiSelectOption>
        );
      })}
    </InputGroup>
  );
};
