import * as U from "./util.ts";

export const Eq: U.Eq<string> = {
  equals: (a, b) => a == b,
};

export const Ord: U.Ord<string> = {
  equals: Eq.equals,
  compare: (a, b) => (a < b ? -1 : a > b ? 1 : 0),
};
