import * as U from "./util.ts";
import * as BST from "./binary_tree.ts";

interface FiniteMapElement<K, V> {
  key: K;
  value: V;
}

export type FiniteMap<K, V> = BST.BinaryTree<FiniteMapElement<K, V>>;

export function Make<K, V>(ord: U.Ord<K>) {
  const _bst = BST.Make<FiniteMapElement<K, V>, K>(ord, (t) => t.key);

  const empty = _bst.empty;

  const isEmpty = _bst.isEmpty;

  const lookup = (self: FiniteMap<K, V>, key: K): V => {
    if (isEmpty(self)) {
      throw Error("NotFound");
    }

    if (ord.compare(key, self.item.key) == -1) {
      return lookup(self.left, key);
    }

    if (ord.compare(key, self.item.key) == 1) {
      return lookup(self.right, key);
    }

    return self.item.value;
  };

  const bind = (self: FiniteMap<K, V>, key: K, value: V): FiniteMap<K, V> => {
    if (isEmpty(self)) {
      return _bst.create({ key, value });
    }
    if (ord.compare(key, self.item.key) == -1) {
      return _bst.create(self.item, bind(self.left, key, value), self.right);
    }
    if (ord.compare(key, self.item.key) == 1) {
      return _bst.create(self.item, self.left, bind(self.right, key, value));
    }

    return self;
  };

  return {
    empty,
    isEmpty,
    lookup,
    bind,
  };
}
