import { Ord } from "./util.ts";

export interface EmptyBinaryTree extends Iterable<any> {
  readonly _tag: "EmptyBinaryTree";
}

export interface BinaryTreeNode<T> extends Iterable<T> {
  readonly item: T;
  readonly left: BinaryTree<T>;
  readonly right: BinaryTree<T>;
}

export type BinaryTree<T> = EmptyBinaryTree | BinaryTreeNode<T>;

export const isEmpty = <T>(self: BinaryTree<T>): self is EmptyBinaryTree =>
  "_tag" in self && self._tag === "EmptyBinaryTree";

export const empty: EmptyBinaryTree = {
  _tag: "EmptyBinaryTree",
  *[Symbol.iterator](): Iterator<any> {},
};

export const create = <T>(
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

export const contains = <T>(
  self: BinaryTree<T>,
  value: T,
  ord: Ord<T>,
): boolean => {
  if (isEmpty(self)) return false;

  if (self.item == value) return true;

  if (ord.compare(value, self.item) == -1) {
    return contains(self.left, value, ord);
  }

  return contains(self.right, value, ord);
};

export const insert = <T>(
  self: BinaryTree<T>,
  value: T,
  ord: Ord<T>,
): BinaryTree<T> => {
  if (isEmpty(self)) return create(value);

  if (self.item === value) return self;

  if (ord.compare(value, self.item) == -1) {
    return create(self.item, insert(self.left, value, ord), self.right);
  } else {
    return create(self.item, self.left, insert(self.right, value, ord));
  }
};

export const insertIter = <T>(self: BinaryTree<T>, value: T, ord: Ord<T>): BinaryTree<T> => {
  const queue: BinaryTreeNode<T>[] = [];

  let current = self;

  while (!isEmpty(current)) {
    if (current.item === value) return self;

    queue.push(current);

  if (ord.compare(value, current.item) == -1){
      current = current.left;
    } else {
      current = current.right;
    }
  }

  let node = create(value);

  while (queue.length > 0) {
    const parent = queue.pop();
    if (!parent) {
      continue;
    }


  if (ord.compare(value, parent.item) == -1){
      node = create(parent.item, node, parent.right);
    } else {
      node = create(parent.item, parent.left, node);
    }
  }

  return node;
};
