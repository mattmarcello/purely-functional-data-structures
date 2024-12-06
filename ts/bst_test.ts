import * as BST from "./bst.ts";
import * as N from "./number.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("implements iterable protocol", () => {
  const empty = BST.empty;

  assertEquals([...empty], []);

  const tree = BST.create(1, BST.create(0), BST.create(2));

  assertEquals([...tree], [0, 1, 2]);
});

Deno.test("contains", () => {
  const tree = BST.create(1, BST.create(0), BST.create(2));

  assertEquals(BST.contains(tree, 0, N.Ord), true);
  assertEquals(BST.contains(tree, 1, N.Ord), true);
  assertEquals(BST.contains(tree, 2, N.Ord), true);
  assertEquals(BST.contains(tree, 3, N.Ord), false);
});

Deno.test("insert", () => {
  const first = BST.insert(BST.empty, 5, N.Ord);
  const second = BST.insert(first, 4, N.Ord);
  const _third = BST.insert(second, 6, N.Ord);
  const third = BST.insert(_third, 6, N.Ord);

  assertEquals([...first], [5]);
  assertEquals([...second], [4, 5]);
  assertEquals([...third], [4, 5, 6]);
});
