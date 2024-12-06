type List<T> = Empty | Cons<T>;

export interface Empty extends Iterable<any> {
  readonly _tag: "EmptyList";
}

export interface Cons<T> extends Iterable<T> {
  head: T;
  tail: List<T>;
}

export const empty: Empty = {
  _tag: "EmptyList",
  *[Symbol.iterator](): Iterator<any> {},
};

const isEmpty = <T>(self: List<T>): self is Empty => "_tag" in self;

export const cons = <T>(head: T, tail: List<T> = empty): Cons<T> => {
  return {
    head: head,
    tail: tail,
    *[Symbol.iterator](): Iterator<T> {
      yield head;
      yield* tail;
    },
  };
};

export const head = <T>(self: List<T>) => {
  if (isEmpty(self)) {
    throw Error("Empty");
  }
  return self.head;
};

export const tail = <T>(self: List<T>): List<T> => {
  if (isEmpty(self)) {
    throw Error("Empty");
  }
  return self.tail;
};

export const concat = <T>(xs: List<T>, ys: Cons<T>): List<T> => {
  if (isEmpty(xs)) {
    return ys;
  }

  return cons(head(xs), concat(tail(xs), ys));
};

export const update = <T>(xs: List<T>, i: number, y: T): List<T> => {
  if (i == 0) {
    return cons(y, tail(xs));
  }

  return cons(head(xs), update(tail(xs), i - 1, y));
};

export const suffixes = <T>(xs: List<T>): List<List<T>> => {
  if (isEmpty(xs)) {
    return cons(empty, empty);
  }

  return cons(xs, suffixes(tail(xs)));
};
