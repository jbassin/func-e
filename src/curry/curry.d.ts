export interface ICurry4<A, B, C, D, R> {
  (a: A, b: B, c: C, d: D): R;
  (a: A, b: B, c: C): ICurry1<D, R>;
  (a: A, b: B): ICurry2<C, D, R>;
  (a: A): ICurry3<B, C, D, R>;
}

export interface ICurry3<A, B, C, R> {
  (a: A, b: B, c: C): R;
  (a: A, b: B): ICurry1<C, R>;
  (a: A): ICurry2<B, C, R>;
}

export interface ICurry2<A, B, R> {
  (a: A, b: B): R;
  (a: A): ICurry1<B, R>;
}

export type ICurry1<A, R> = (a: A) => R;

export type ICurryN<T, R> = T extends [any, any, any, any]
  ? ICurry4<T[0], T[1], T[2], T[3], R>
  : T extends [any, any, any]
  ? ICurry3<T[0], T[1], T[2], R>
  : T extends [any, any]
  ? ICurry2<T[0], T[1], R>
  : T extends [any]
  ? ICurry1<T[0], R>
  : unknown;

export function curry<T extends any[], R>(fn: (...args: T) => R): ICurryN<T, R>;
