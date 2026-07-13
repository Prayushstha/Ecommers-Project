import { it, expect, describe } from "vitest";
import { formatcurrency } from "./price";

describe("Format Currency", () => {
  it("formats 1999 as 19.99", () => {
    expect(formatcurrency(1999)).toBe("19.99");
  });
  it("displays 2 decimals", () => {
    expect(formatcurrency(1090)).toBe("10.90");
    expect(formatcurrency(100)).toBe("1.00");
  });
});
