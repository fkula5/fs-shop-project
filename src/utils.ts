export const pipe = <T>(val: T, ...fns: ((x: T) => T)[]): T => {
  return fns.reduce((prev, fn) => fn(prev), val);
};

export type Predicate<T> = (item: T) => boolean;
