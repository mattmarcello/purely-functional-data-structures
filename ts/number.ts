import * as U from "./util.ts";

export const Eq: U.Eq<number> = {
  equals: (a, b) => a == b,
};

export const Ord: U.Ord<number> = {
  equals: Eq.equals,
  compare: (a, b) => (a < b ? -1 : a > b ? 1 : 0),
};
