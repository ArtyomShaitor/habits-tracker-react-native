import { Routes } from "@/types/Routes";
import {
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useNavigation = () =>
  useNativeNavigation<NativeStackNavigationProp<Routes>>();

export const useRoute = () =>
  useNativeRoute();
