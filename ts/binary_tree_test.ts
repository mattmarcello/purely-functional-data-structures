import * as BT from "./binary_tree.ts";
import * as N from "./number.ts";
import { assertEquals } from "jsr:@std/assert";

const BinaryTreeNumber = BT.Make<number, number>(N.Ord, (t) => t);


Deno.test("implements iterable protocol", () => {
  const empty = BinaryTreeNumber.empty;

  assertEquals([...empty], []);

  const tree = BinaryTreeNumber.create(
    1,
    BinaryTreeNumber.create(0),
    BinaryTreeNumber.create(2),
  );

  assertEquals([...tree], [0, 1, 2]);
});

Deno.test("contains", () => {
  const tree = BinaryTreeNumber.create(
    1,
    BinaryTreeNumber.create(0),
    BinaryTreeNumber.create(2),
  );

  assertEquals(BinaryTreeNumber.contains(tree, 0), true);
  assertEquals(BinaryTreeNumber.contains(tree, 1), true);
  assertEquals(BinaryTreeNumber.contains(tree, 2), true);
  assertEquals(BinaryTreeNumber.contains(tree, 3), false);
});

Deno.test("insert", () => {
  const first = BinaryTreeNumber.insert(BinaryTreeNumber.empty, 5);
  const second = BinaryTreeNumber.insert(first, 4);
  const _third = BinaryTreeNumber.insert(second, 6);
  const third = BinaryTreeNumber.insert(_third, 6);

  assertEquals([...first], [5]);
  assertEquals([...second], [4, 5]);
  assertEquals([...third], [4, 5, 6]);
});
