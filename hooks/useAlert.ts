import { Alert } from "react-native";

export const useAlert = () => {
  const alert = (...args: Parameters<typeof Alert.alert>): Promise<boolean> =>
    new Promise((resolve) => {
      const [title, message, _buttons] = args;
      const buttons = _buttons?.map((button, index) => ({
        ...button,
        onPress: () => resolve(index !== 0),
      }));

      Alert.alert(title, message, buttons);
    });
  return { alert };
};
