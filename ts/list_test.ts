import * as List from "./list.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("concat", () => {
  const xs = List.cons(1);
  const ys = List.cons(2, List.cons(3));
  const result = List.concat(xs, ys);

  assertEquals([...xs], [1]);
  assertEquals([...ys], [2, 3]);

  assertEquals([...result], [1, 2, 3]);
});

Deno.test("update", () => {
  const xs = List.cons(
    0,
    List.cons(1, List.cons(2, List.cons(3, List.cons(4)))),
  );
  const y = 7;

  const result = List.update(xs, 2, y);

  assertEquals([...xs], [0, 1, 2, 3, 4]);
  assertEquals([...result], [0, 1, 7, 3, 4]);
});

Deno.test("suffixes", () => {
  const suffixes = List.cons(1, List.cons(2, List.cons(3, List.cons(4))));

  const result =  [ ...List.suffixes(suffixes) ].map(
     list => [ ...list ]
  )


  assertEquals(result, [[1, 2, 3, 4], [2, 3, 4], [ 3, 4], [4], []])


});
