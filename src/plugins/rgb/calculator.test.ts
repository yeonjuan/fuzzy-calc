import { describe, it, expect } from "vitest";
import { compute } from "./calculator";

describe("rgb calculator", () => {
  describe("HEX output", () => {
    it("rgb → 6-digit hex", () => {
      const result = compute("rgb(255, 107, 107)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#FF6B6B");
    });

    it("black", () => {
      const result = compute("rgb(0, 0, 0)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#000000");
    });

    it("white", () => {
      const result = compute("rgb(255, 255, 255)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#FFFFFF");
    });

    it("rgba → 8-digit hex", () => {
      const result = compute("rgba(255, 0, 0, 0.5)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#FF000080");
    });

    it("rgba fully transparent → AA = 00", () => {
      const result = compute("rgba(0, 0, 0, 0)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#00000000");
    });

    it("rgba fully opaque → AA = ff", () => {
      const result = compute("rgba(255, 255, 255, 1)");
      expect(result.find((r) => r.label === "HEX")?.value).toBe("#FFFFFFFF");
    });
  });

  describe("HSL output", () => {
    it("black → hsl(0, 0%, 0%)", () => {
      const result = compute("rgb(0, 0, 0)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 0%, 0%)");
    });

    it("white → hsl(0, 0%, 100%)", () => {
      const result = compute("rgb(255, 255, 255)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 0%, 100%)");
    });

    it("pure red → hsl(0, 100%, 50%)", () => {
      const result = compute("rgb(255, 0, 0)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 100%, 50%)");
    });

    it("pure green → hsl(120, 100%, 50%)", () => {
      const result = compute("rgb(0, 255, 0)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(120, 100%, 50%)");
    });

    it("pure blue → hsl(240, 100%, 50%)", () => {
      const result = compute("rgb(0, 0, 255)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(240, 100%, 50%)");
    });

    it("rgba includes alpha in hsla()", () => {
      const result = compute("rgba(255, 0, 0, 0.5)");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsla(0, 100%, 50%, 0.5)");
    });
  });

  describe("invalid input", () => {
    it("returns empty array", () => {
      expect(compute("not-a-color")).toHaveLength(0);
    });
  });
});
