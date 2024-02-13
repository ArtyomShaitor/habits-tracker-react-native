import { useNavigation } from "@/hooks/useNavigation";
import { useLayoutEffect } from "react";
import { View } from "react-native";

export const RedirectBack = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.goBack();
  }, [navigation]);

  return <View />;
};
