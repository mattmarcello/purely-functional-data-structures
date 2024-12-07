import * as U from "./util.ts";

export interface LeftistHeapEmpty extends Iterable<any> {
  readonly _tag: "LeftistHeapEmpty";
}

export interface LeftistHeapReplete<T> extends Iterable<T> {
  readonly _tag: "LeftistHeapReplete";
  min: T;
  left: LeftistHeap<T>;
  right: LeftistHeap<T>;
  rank: number;
}

type LeftistHeap<T> = LeftistHeapEmpty | LeftistHeapReplete<T>;

export function Make<T>(ord: U.Ord<T>) {
  const empty: LeftistHeapEmpty = {
    _tag: "LeftistHeapEmpty",
    *[Symbol.iterator]() {},
  };

  const isEmpty = (self: LeftistHeap<T>): boolean => {
    switch (self._tag) {
      case "LeftistHeapEmpty":
        return true;
      case "LeftistHeapReplete":
        return false;
    }
  };

  const rank = (self: LeftistHeap<T>): number => {
    switch (self._tag) {
      case "LeftistHeapEmpty":
        return 0;
      case "LeftistHeapReplete":
        return self.rank;
    }
  };

  const make = (
    min: T,
    left: LeftistHeap<T>,
    right: LeftistHeap<T>,
  ): LeftistHeap<T> => {
    if (rank(left) >= rank(right)) {
      return {
        _tag: "LeftistHeapReplete",
        min: min,
        left: left,
        right: right,
        rank: rank(right) + 1,
        *[Symbol.iterator]() {
          yield min;
          yield* left;
          yield* right;
        },
      };
    } else {
      return {
        _tag: "LeftistHeapReplete",
        min: min,
        left: right,
        right: left,
        rank: rank(left) + 1,
        *[Symbol.iterator]() {
          yield min;
          yield* left;
          yield* right;
        },
      };
    }
  };

  const merge = (a: LeftistHeap<T>, b: LeftistHeap<T>): LeftistHeap<T> => {
    if (isEmpty(a)) {
      return b;
    }

    if (isEmpty(a)) {
      return b;
    }

    const a_ = a as LeftistHeapReplete<T>;
    const b_ = b as LeftistHeapReplete<T>;

    if (ord.compare(a_.min, b_.min) != 1) {
      return make(a_.min, a_.left, merge(a_.right, b_));
    } else {
      return make(b_.min, b_.left, merge(a_, b_.right));
    }
  };

  const insert = (x: T, b: LeftistHeap<T>): LeftistHeap<T> => {
    return merge(make(x, empty, empty), b);
  };

  const findMin = (self: LeftistHeap<T>): T => {
    switch (self._tag) {
      case "LeftistHeapEmpty":
        throw Error("Empty");
      case "LeftistHeapReplete":
        return self.min;
    }
  };

  const deleteMin = (self: LeftistHeap<T>): LeftistHeap<T> => {
    switch (self._tag) {
      case "LeftistHeapEmpty":
        throw Error("Empty");
      case "LeftistHeapReplete":
        return merge(self.left, self.right);
    }
  };

  return {
    empty,
    isEmpty,
    rank,
    make,
    merge,
    insert,
    findMin,
    deleteMin,
  };
}
