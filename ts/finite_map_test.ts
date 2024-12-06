import * as FiniteMap from "./finite_map.ts";
import * as N from "./number.ts";
import * as S from "./string.ts";
import { assertEquals } from "jsr:@std/assert";

const NumberToStringFiniteMap = FiniteMap.Make<number, string>(N.Ord);

const StringToStringFiniteMap = FiniteMap.Make<string, string>(S.Ord);

Deno.test("implements iterable protocol", () => {
  const empty = NumberToStringFiniteMap.empty;

  assertEquals([...empty], []);
});

Deno.test("bind", () => {
  const empty = NumberToStringFiniteMap.empty;
  const fm_1 = NumberToStringFiniteMap.bind(empty, 4, "four");
  const fm_2 = NumberToStringFiniteMap.bind(fm_1, 5, "five");
  const fm_3 = NumberToStringFiniteMap.bind(fm_2, 3, "three");

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

Deno.test("StringToStringFiniteMap", () => {
  const empty = StringToStringFiniteMap.empty;
  const fm_1 = StringToStringFiniteMap.bind(empty, "name", "shaman");
  const fm_2 = StringToStringFiniteMap.bind(fm_1, "age", "10");
  const fm_3 = StringToStringFiniteMap.bind(fm_2, "cuteness", "11");

  assertEquals([...fm_1], [{ key: "name", value: "shaman" }]);
  assertEquals(
    [...fm_2],
    [
      { key: "age", value: "10" },
      {
        key: "name",
        value: "shaman",
      },
    ],
  );
  assertEquals(
    [...fm_3],
    [
      { key: "age", value: "10" },
      { key: "cuteness", value: "11" },
      {
        key: "name",
        value: "shaman",
      },
    ],
  );
});
