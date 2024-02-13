import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { TouchableWithoutFeedback } from "react-native";

interface Context {
  registerClose: (fn: () => void) => void;
}

const context = createContext<Context>({
  registerClose: () => {},
});

const { Provider } = context;

export const useOutsideClick = (fn: () => void) => {
  const { registerClose } = useContext(context);

  registerClose(fn);
};

export const CloseProvider = ({ children }: { children: ReactNode }) => {
  const closeRef = useRef(() => {});
  const registerClose = useCallback<Context["registerClose"]>((fn) => {
    closeRef.current = fn;
  }, []);

  const value = useMemo(
    () => ({
      registerClose,
    }),
    [registerClose],
  );

  return (
    <Provider value={value}>
      <TouchableWithoutFeedback
        onPress={() => {
          closeRef.current();
          closeRef.current = () => {};
        }}
      >
        {children}
      </TouchableWithoutFeedback>
    </Provider>
  );
};
