export const pipe = <T>(val: T, ...fns: ((x: T) => T)[]): T => {
  return fns.reduce((prev, fn) => fn(prev), val);
};

export const compose =
  <T>(...fns: ((x: T) => T)[]) =>
  (val: T): T => {
    return fns.reduceRight((prev, fn) => fn(prev), val);
  };

export const curry =
  <A, B, C>(fn: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B): C =>
    fn(a, b);

export type Predicate<T> = (item: T) => boolean;

export const and =
  <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  (item: T) =>
    predicates.every((p) => p(item));

export const or =
  <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  (item: T) =>
    predicates.some((p) => p(item));

export const not =
  <T>(predicate: Predicate<T>): Predicate<T> =>
  (item: T) =>
    !predicate(item);

export const first = <T>(arr: readonly T[]): T | undefined => arr[0];

export const last = <T>(arr: readonly T[]): T | undefined =>
  arr[arr.length - 1];

export const chunk = <T>(arr: readonly T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size) as T[]);
  }
  return result;
};

export const unique = <T>(arr: readonly T[]): T[] => Array.from(new Set(arr));

export const groupBy = <T, K extends string | number>(
  arr: readonly T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    return {
      ...acc,
      [key]: [...(acc[key] || []), item],
    };
  }, {} as Record<K, T[]>);
};

export const sum = (arr: readonly number[]): number =>
  arr.reduce((acc, n) => acc + n, 0);

export const average = (arr: readonly number[]): number =>
  arr.length === 0 ? 0 : sum(arr) / arr.length;

export const min = (arr: readonly number[]): number =>
  arr.length === 0 ? 0 : Math.min(...arr);

export const max = (arr: readonly number[]): number =>
  arr.length === 0 ? 0 : Math.max(...arr);

export type Maybe<T> = T | null | undefined;

export const maybeMap =
  <T, U>(fn: (val: T) => U) =>
  (val: Maybe<T>): Maybe<U> =>
    val != null ? fn(val) : (val as Maybe<U>);

export const withDefault =
  <T>(defaultValue: T) =>
  (val: Maybe<T>): T =>
    val ?? defaultValue;

export const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};
