import { assertEquals } from "jsr:@std/assert";
import * as N from "./number.ts";
import * as LeftistHeap from "./leftist_heap.ts";

const LeftistHeapNumber = LeftistHeap.Make(N.Ord);

Deno.test("implements the iterable protocol", () => {
  const empty = LeftistHeapNumber.empty;
  const a = LeftistHeapNumber.insert(1, empty);
  const b = LeftistHeapNumber.insert(2, a);
  const c = LeftistHeapNumber.insert(0, b);
  const d = LeftistHeapNumber.insert(4, c);

  assertEquals([...empty], []);
  assertEquals([...a], [1]);
  assertEquals([...b], [1, 2]);
  assertEquals([...c], [0, 1, 2]);
  assertEquals([...d], [0, 1, 2, 4]);
});

Deno.test("merge / min / delete min ", () => {
  const a = LeftistHeapNumber.make(
    5,
    LeftistHeapNumber.empty,
    LeftistHeapNumber.empty,
  );
  const b = LeftistHeapNumber.make(
    11,
    LeftistHeapNumber.empty,
    LeftistHeapNumber.empty,
  );
  const c = LeftistHeapNumber.make(
    3,
    LeftistHeapNumber.empty,
    LeftistHeapNumber.empty,
  );
  const d = LeftistHeapNumber.make(
    20,
    LeftistHeapNumber.empty,
    LeftistHeapNumber.empty,
  );
  const e = LeftistHeapNumber.make(
    2,
    LeftistHeapNumber.empty,
    LeftistHeapNumber.empty,
  );

  const result = LeftistHeapNumber.merge(
    a,
    LeftistHeapNumber.merge(
      b,
      LeftistHeapNumber.merge(c, LeftistHeapNumber.merge(d, e)),
    ),
  );

  const min = LeftistHeapNumber.findMin(result);
  assertEquals(min, 2);
  const result_ = LeftistHeapNumber.deleteMin(result);
  const min_ = LeftistHeapNumber.findMin(result_);
  assertEquals(min_, 3);
  const result__ = LeftistHeapNumber.deleteMin(result_);
  const min__ = LeftistHeapNumber.findMin(result__);
  assertEquals(min__, 5);
  const result___ = LeftistHeapNumber.deleteMin(result__);
  const min___ = LeftistHeapNumber.findMin(result___);
  assertEquals(min___, 11);

  const result____ = LeftistHeapNumber.deleteMin(result___);
  const min____ = LeftistHeapNumber.findMin(result____);
  assertEquals(min____, 20);
});
