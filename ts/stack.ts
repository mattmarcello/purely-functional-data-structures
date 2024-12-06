export type Stack<T> = Empty | Cons<T>;

export interface Empty extends Iterable<any> {
  readonly _tag: "EmptyStack";
}

export interface Cons<T> extends Iterable<T> {
  x: T;
  stack: Stack<T>;
}

export const empty: Empty = {
  _tag: "EmptyStack",
  *[Symbol.iterator](): Iterator<any> {},
};

const isEmpty = <T>(self: Stack<T>): self is Empty => "_tag" in self;

export const cons = <T>(x: T, stack: Stack<T> = empty): Cons<T> => {
  return {
    x: x,
    stack: stack,
    *[Symbol.iterator](): Iterator<T> {
      yield x;
      yield* stack;
    },
  };
};

export const head = <T>(self: Stack<T>) => {
  if (isEmpty(self)) {
    throw Error("Empty");
  }
  return self.x;
};

export const tail = <T>(self: Stack<T>): Stack<T> => {
  if (isEmpty(self)) {
    throw Error("Empty");
  }
  return self.stack;
};


