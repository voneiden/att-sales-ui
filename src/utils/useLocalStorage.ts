import { useEffect, useState } from 'react';

type Props = {
  defaultValue: any;
  key: string;
};

const useLocalStorage = ({ defaultValue, key }: Props) => {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue !== null && storageValue !== undefined ? JSON.parse(storageValue) : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
