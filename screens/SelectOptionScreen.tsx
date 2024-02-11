import { Select } from "@/components/SettingsInputs";
import { DAYS_OPTIONS } from "@/config";
import { Routes } from "@/types/Routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { DeviceEventEmitter, Text, View } from "react-native";

type SelectOptionScreenProps = NativeStackScreenProps<Routes, "SelectOption">;

export const SelectOptionScreen = (props: SelectOptionScreenProps) => {
  const { route, navigation } = props;
  const {
    params: { data, eventName, checked = [], max, min, headerTitle = "Select" },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle });
  }, []);

  const onChange = (newChecked: (string | number)[]) => {
    DeviceEventEmitter.emit(eventName, newChecked);
    if (max === min && max === 1) {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1 px-10 pt-5">
      <Select
        data={data}
        checked={checked}
        onChange={onChange}
        min={min}
        max={max}
      />
    </View>
  );
};
