import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedItems, setStoredItems] = useState(() => {
    try {
      const items = window.localStorage.getItem(key);

      return items ? JSON.parse(items) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedItems));
    } catch (error) {}
  }, [storedItems, key]);

  return [storedItems, setStoredItems];
};

export default useLocalStorage;
