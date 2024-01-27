import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [valueDebounce, setValueDebounce] = useState<T>(value);
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, delay);
    return () => {
      clearTimeout(handle);
    };
  }, [value, delay]);
  return valueDebounce;
};
