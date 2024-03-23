import { Dispatch, SetStateAction, useEffect, useState } from "react";

/*

useState but now the state is persisted on browser reload.
Uses Local Storage.

Usage -> Provide a key and a initial value 
const [count, setCount] = usePersistedState('count', 0);
*/
export default function usePersistedState<Type>(
  key: string,
  initialValue: Type
): [Type, Dispatch<SetStateAction<Type>>] {
  const [value, setValue] = useState<Type>(() => {
    if (typeof window === "undefined") return initialValue;
    const localStorageValue = JSON.parse(
      window.localStorage.getItem(key) as string
    );
    return localStorageValue || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
