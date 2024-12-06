export interface EmptyList extends Iterable<any> {
  readonly _tag: "EmpyList";
}

export interface LinkedListNode<T> extends Iterable<T> {
  readonly value: T;
  readonly next: LinkedList<T>;
}

export type LinkedList<T> = EmptyList | LinkedListNode<T>;

export const empty: EmptyList = {
  _tag: "EmpyList",
  *[Symbol.iterator](): Iterator<any> {},
};

export const make = <T>(value: T, next: LinkedList<T> = empty) => ({
  value,
  next,
  *[Symbol.iterator](): Iterator<any> {
    yield value;
    yield* next;
  },
});

export const prepend = <T>(self: LinkedList<T>, value: T) => make(value, self);

export const concat = <T>(
  self: LinkedList<T>,
  other: LinkedList<T>,
): LinkedList<T> => {
  if (isEmpty(self)) return other;
  return make(self.value, concat(self.next, other));
};

export const append = <T>(self: LinkedList<T>, value: T) =>
  concat(self, make(value));

export const isEmpty = <T>(self: LinkedList<T>): self is EmptyList =>
  "_tag" in self && self._tag === "EmpyList";
