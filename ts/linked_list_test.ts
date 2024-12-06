import { assertEquals } from "jsr:@std/assert";

import * as LinkedList from "./linked_list.ts";

Deno.test("implements the iterable protocol", () => {
  assertEquals([...LinkedList.empty], []);
  const list = LinkedList.make(1, LinkedList.make(2, LinkedList.make(3)));
  assertEquals([...list], [1, 2, 3]);
});

Deno.test("prepend item to front of list", () => {
  const list_a = LinkedList.make(1, LinkedList.make(2, LinkedList.make(3)));
  const list_b = LinkedList.prepend(list_a, 0);

  assertEquals([...list_b], [0, 1, 2, 3]);
});

Deno.test("concat two lists", () => {
  const list_a = LinkedList.make(1, LinkedList.make(2, LinkedList.make(3)));
  const list_b = LinkedList.make(4, LinkedList.make(5, LinkedList.make(6)));
  const result = LinkedList.concat(list_a, list_b)

  assertEquals([...list_a], [1, 2, 3]);
  assertEquals([...list_b], [4, 5, 6]);
  assertEquals([...result ], [1, 2, 3, 4, 5, 6]);
});

Deno.test("append", () => {
  const list = LinkedList.make(1, LinkedList.make(2, LinkedList.make(3)));
  const result = LinkedList.append(list,4)

  assertEquals([...result ], [1, 2, 3, 4,]);
});
