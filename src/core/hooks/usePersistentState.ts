import { useCallback, useState } from "react";
import { stringifyValue } from "utils/client";

function getInitialValue<T>(key: string, initialValue?: T) {
  const storageValue = localStorage.getItem(key);

  if (storageValue) return JSON.parse(storageValue);

  if (initialValue) localStorage.setItem(key, stringifyValue(initialValue));

  return initialValue;
}

export function usePersistentState<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(getInitialValue(key, initialValue));

  const set = useCallback((newValue: T) => {
    if (typeof newValue === "undefined") return;

    const storageValue = stringifyValue(newValue);

    setValue(newValue);
    localStorage.setItem(key, storageValue);
  }, []);

  const remove = useCallback(() => {
    setValue(initialValue ?? undefined);
    localStorage.removeItem(key);
  }, []);

  return {
    value,
    set,
    remove,
  };
}
