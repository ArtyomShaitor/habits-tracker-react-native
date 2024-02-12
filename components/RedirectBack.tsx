import { useNavigation } from "@/hooks/useNavigation";
import { useLayoutEffect } from "react";
import { View } from "react-native";

export const RedirectBack = () => {
  const naigation = useNavigation();
  useLayoutEffect(() => {
    naigation.goBack();
  }, []);

  return <View></View>;
};
