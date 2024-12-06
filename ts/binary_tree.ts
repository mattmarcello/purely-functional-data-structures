import { Ord } from "./util.ts";

export interface Empty extends Iterable<any> {
  readonly _tag: "Empty";
}

export interface Node<T> extends Iterable<T> {
  readonly item: T;
  readonly left: BinaryTree<T>;
  readonly right: BinaryTree<T>;
}

export type BinaryTree<T> = Empty | Node<T>;

export function Make<T, K>(ord: Ord<K>, valueToOrderable: (t: T) => K) {
  const isEmpty = <T>(self: BinaryTree<T>): self is Empty =>
    "_tag" in self && self._tag === "Empty";

  const empty: Empty = {
    _tag: "Empty",
    *[Symbol.iterator](): Iterator<any> {},
  };

  const create = (
    item: T,
    left: BinaryTree<T> = empty,
    right: BinaryTree<T> = empty,
  ) => ({
    item,
    left,
    right,
    *[Symbol.iterator](): Iterator<any> {
      yield* left;
      yield item;
      yield* right;
    },
  });

  const contains = (self: BinaryTree<T>, value: T): boolean => {
    if (isEmpty(self)) return false;

    if (self.item == value) return true;

    if (
      ord.compare(valueToOrderable(value), valueToOrderable(self.item)) == -1
    ) {
      return contains(self.left, value);
    }

    return contains(self.right, value);
  };

  const insert = (self: BinaryTree<T>, value: T): BinaryTree<T> => {
    if (isEmpty(self)) return create(value);

    if (self.item === value) return self;

    if (ord.compare(valueToOrderable(value), valueToOrderable(self.item)) == -1) {
      return create(self.item, insert(self.left, value), self.right);
    } else {
      return create(self.item, self.left, insert(self.right, value));
    }
  };

  return {
    isEmpty,
    empty,
    create,
    contains,
    insert,
  };
}

//
// export const insertIter = <T>(
//   self: BinaryTree<T>,
//   value: T,
//   ord: Ord<T>,
// ): BinaryTree<T> => {
//   const queue: BinaryTreeNode<T>[] = [];
//
//   let current = self;
//
//   while (!isEmpty(current)) {
//     if (current.item === value) return self;
//
//     queue.push(current);
//
//     if (ord.compare(value, current.item) == -1) {
//       current = current.left;
//     } else {
//       current = current.right;
//     }
//   }
//
//   let node = create(value);
//
//   while (queue.length > 0) {
//     const parent = queue.pop();
//     if (!parent) {
//       continue;
//     }
//
//     if (ord.compare(value, parent.item) == -1) {
//       node = create(parent.item, node, parent.right);
//     } else {
//       node = create(parent.item, parent.left, node);
//     }
//   }
//
//   return node;
// };
