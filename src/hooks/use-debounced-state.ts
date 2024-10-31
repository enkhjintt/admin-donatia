'use client';

import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
//
// export function useDebouncedState<T = any>(defaultValue: T, wait: number) {
//   const [value, setValue] = useState(defaultValue);
//
//   const timeoutRef = useRef<number>();
//
//   const clearTimeout = () => window.clearTimeout(timeoutRef.current);
//
//   useEffect(() => clearTimeout, []);
//
//   const debouncedSetValue = (newValue: T) => {
//     clearTimeout();
//
//     timeoutRef.current = window.setTimeout(() => {
//       setValue(newValue);
//     }, wait);
//   };
//
//   return [value, debouncedSetValue] as const;
// }

export function useDebouncedState<T>(
  defaultValue: T,
  wait: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  const timeoutRef = useRef<number>();

  const clearTimeout = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => clearTimeout, []);

  const debouncedSetValue: Dispatch<SetStateAction<T>> = (
    newValue: SetStateAction<T>,
  ) => {
    clearTimeout();

    timeoutRef.current = window.setTimeout(() => {
      setValue(newValue);
    }, wait);
  };

  return [value, debouncedSetValue];
}
