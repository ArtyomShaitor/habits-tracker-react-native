export type NotUndefined<T extends any | undefined> = T extends undefined
  ? Exclude<T, undefined>
  : T;
