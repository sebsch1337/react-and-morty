import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initialValue
  );

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(state)),
    [state, key]
  );

  const remove = () => localStorage.removeItem(key);

  return [state, setState, remove];
}
