import { Routes } from "@/types/Routes";
import {
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

export const useNavigation = () =>
  useNativeNavigation<NativeStackNavigationProp<Routes>>();

export const useNavigationOptions = (
  options: Partial<NativeStackNavigationOptions>,
) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};

export const useRoute = () => useNativeRoute();
