import { describe, it, expect } from "vitest";
import { compute } from "./calculator";

function result(input: string) {
  return compute(input).find((r) => r.label === "Result")?.value;
}

describe("arithmetic calculator", () => {
  describe("basic operations", () => {
    it("addition", () => expect(result("1 + 2")).toBe("3"));
    it("subtraction", () => expect(result("10 - 4")).toBe("6"));
    it("multiplication", () => expect(result("3 * 4")).toBe("12"));
    it("division", () => expect(result("10 / 4")).toBe("2.5"));
  });

  describe("operator precedence", () => {
    it("* before +", () => expect(result("2 + 3 * 4")).toBe("14"));
    it("/ before -", () => expect(result("10 - 6 / 2")).toBe("7"));
    it("parentheses override precedence", () => expect(result("(2 + 3) * 4")).toBe("20"));
    it("nested parentheses", () => expect(result("((2 + 3) * (4 - 1))")).toBe("15"));
  });

  describe("unary minus", () => {
    it("negative number", () => expect(result("-5 + 3")).toBe("-2"));
    it("negative in parens", () => expect(result("(-2) * 3")).toBe("-6"));
  });

  describe("decimals", () => {
    it("decimal addition", () => expect(result("1.5 + 2.5")).toBe("4"));
    it("decimal multiplication", () => expect(result("0.1 * 10")).toBe("1"));
  });

  describe("chained operations", () => {
    it("left to right same precedence", () => expect(result("10 - 3 - 2")).toBe("5"));
    it("complex expression", () => expect(result("1 + 2 * (3 - 4)")).toBe("-1"));
  });

  describe("invalid input", () => {
    it("unmatched paren throws", () => expect(() => compute("(1 + 2")).toThrow());
    it("trailing operator throws", () => expect(() => compute("1 +")).toThrow());
  });
});
