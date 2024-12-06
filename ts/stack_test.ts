import * as Stack from "./stack.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("implements iterable protocol", () => {
  const empty = Stack.empty;

  assertEquals([...empty], []);

  const one = Stack.cons(1, empty);
  const two = Stack.cons(2, one);
  const three = Stack.cons(3, two);

  assertEquals([...one], [1]);
  assertEquals([...two], [2, 1]);
  assertEquals([...three], [3, 2, 1]);
});

Deno.test("head", () => {
  const one = Stack.cons(1);
  const two = Stack.cons(2, one);
  const three = Stack.cons(3, two);

  assertEquals(Stack.head(one), 1);
  assertEquals(Stack.head(two), 2);
  assertEquals(Stack.head(three), 3);
});


Deno.test("head", () => {
  const one = Stack.cons(1);
  const two = Stack.cons(2, one);
  const three = Stack.cons(3, two);

  assertEquals([ ...Stack.tail(one) ], []);
  assertEquals([ ...Stack.tail(two) ], [1]);
  assertEquals([ ...Stack.tail(three) ], [2, 1]);
});
