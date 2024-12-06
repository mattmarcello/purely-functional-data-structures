import * as U from "./util.ts";
import * as BST from "./bst.ts";

interface FiniteMapElement<K, V> {
  key: K;
  value: V;
}

export type FiniteMap<K, V> = BST.BinaryTree<FiniteMapElement<K, V>>;
export const empty = BST.empty;

export const isEmpty = BST.isEmpty;

export const lookup = <K, V>(
  self: FiniteMap<K, V>,
  key: K,
  ord: U.Ord<K>,
): V => {
  if (isEmpty(self)) {
    throw Error("NotFound");
  }

  if (ord.compare(key, self.item.key) == -1) {
    return lookup(self.left, key, ord);
  }

  if (ord.compare(key, self.item.key) == 1) {
    return lookup(self.right, key, ord);
  }

  return self.item.value;
};

export const bind = <K, V>(
  self: FiniteMap<K, V>,
  key: K,
  value: V,
  ord: U.Ord<K>,
): FiniteMap<K, V> => {
  if (isEmpty(self)) {
    return BST.create({ key, value });
  }
  if (ord.compare(key, self.item.key) == -1) {
    return BST.create(self.item, bind(self.left, key, value, ord), self.right);
  }
  if (ord.compare(key, self.item.key) == 1) {
    return BST.create(self.item, self.left, bind(self.right, key, value, ord));
  }

  return self;
};
