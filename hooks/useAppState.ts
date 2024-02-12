import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useAppState = (listener: (state: AppStateStatus) => void) => {
  useEffect(() => {
    const handler = AppState.addEventListener("change", listener);

    return () => handler.remove();
  }, [listener]);
};
