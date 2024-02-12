import { useCallback, useEffect, useState } from "react";

export const useData = <T>(
  initialState: T | (() => T),
  preloadFn: () => Promise<T>,
  onChange?: (newState: T) => void,
) => {
  const [state, _setState] = useState<T>(initialState);

  const fetch = useCallback(async () => {
    const newState = await preloadFn();
    _setState(newState);
  }, [preloadFn]);

  useEffect(() => {
    fetch();
  }, []);

  const setState = useCallback<typeof _setState>(
    (newState) => {
      _setState((s) => {
        // @ts-ignore
        const payload = typeof newState === "function" ? newState(s) : newState;
        onChange?.(payload);
        return payload;
      });
    },
    [onChange],
  );

  return [state, setState, fetch] as const;
};
