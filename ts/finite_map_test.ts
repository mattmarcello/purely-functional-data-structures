import * as FiniteMap from "./finite_map.ts";
import * as N from "./number.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("implements iterable protocol", () => {
  const empty = FiniteMap.empty;
  assertEquals([...empty], []);
});

Deno.test("bind", () => {
  const empty = FiniteMap.empty;
  const fm_1 = FiniteMap.bind(empty, 4, "four", N.Ord);
  const fm_2 = FiniteMap.bind(fm_1, 5, "five", N.Ord);
  const fm_3 = FiniteMap.bind(fm_2, 3, "three", N.Ord);

  assertEquals([...fm_1], [{ key: 4, value: "four" }]);
  assertEquals(
    [...fm_2],
    [
      { key: 4, value: "four" },
      {
        key: 5,
        value: "five",
      },
    ],
  );
  assertEquals(
    [...fm_2],
    [
      { key: 4, value: "four" },
      {
        key: 5,
        value: "five",
      },
    ],
  );
  assertEquals(
    [...fm_3],
    [
      { key: 3, value: "three" },
      { key: 4, value: "four" },
      {
        key: 5,
        value: "five",
      },
    ],
  );
});
