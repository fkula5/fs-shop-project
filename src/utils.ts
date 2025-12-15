// src/utils.ts

// Prosta implementacja funkcji pipe, która przekazuje dane z lewej do prawej
// To pozwoli nam pisać kod w stylu: pipe(dane, funkcja1, funkcja2, funkcja3)
export const pipe = <T>(val: T, ...fns: ((x: T) => T)[]): T => {
  return fns.reduce((prev, fn) => fn(prev), val);
};

// Pomocniczy typ dla predykatów (funkcji zwracających boolean)
export type Predicate<T> = (item: T) => boolean;
