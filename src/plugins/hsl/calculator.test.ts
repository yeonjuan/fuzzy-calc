import { describe, it, expect } from "vitest";
import { compute } from "./calculator";

describe("hsl calculator", () => {
  describe("RGB output", () => {
    it("black → rgb(0, 0, 0)", () => {
      expect(compute("hsl(0, 0%, 0%)").find((r) => r.label === "RGB")?.value).toBe("rgb(0, 0, 0)");
    });

    it("white → rgb(255, 255, 255)", () => {
      expect(compute("hsl(0, 0%, 100%)").find((r) => r.label === "RGB")?.value).toBe("rgb(255, 255, 255)");
    });

    it("pure red → rgb(255, 0, 0)", () => {
      expect(compute("hsl(0, 100%, 50%)").find((r) => r.label === "RGB")?.value).toBe("rgb(255, 0, 0)");
    });

    it("pure green → rgb(0, 255, 0)", () => {
      expect(compute("hsl(120, 100%, 50%)").find((r) => r.label === "RGB")?.value).toBe("rgb(0, 255, 0)");
    });

    it("pure blue → rgb(0, 0, 255)", () => {
      expect(compute("hsl(240, 100%, 50%)").find((r) => r.label === "RGB")?.value).toBe("rgb(0, 0, 255)");
    });

    it("hsla includes alpha in rgba()", () => {
      expect(compute("hsla(0, 100%, 50%, 0.5)").find((r) => r.label === "RGB")?.value).toBe("rgba(255, 0, 0, 0.5)");
    });
  });

  describe("HEX output", () => {
    it("black → #000000", () => {
      expect(compute("hsl(0, 0%, 0%)").find((r) => r.label === "HEX")?.value).toBe("#000000");
    });

    it("white → #FFFFFF", () => {
      expect(compute("hsl(0, 0%, 100%)").find((r) => r.label === "HEX")?.value).toBe("#FFFFFF");
    });

    it("pure red → #FF0000", () => {
      expect(compute("hsl(0, 100%, 50%)").find((r) => r.label === "HEX")?.value).toBe("#FF0000");
    });

    it("pure green → #00FF00", () => {
      expect(compute("hsl(120, 100%, 50%)").find((r) => r.label === "HEX")?.value).toBe("#00FF00");
    });

    it("pure blue → #0000FF", () => {
      expect(compute("hsl(240, 100%, 50%)").find((r) => r.label === "HEX")?.value).toBe("#0000FF");
    });

    it("hsla → 8-digit hex", () => {
      expect(compute("hsla(0, 100%, 50%, 0.5)").find((r) => r.label === "HEX")?.value).toBe("#FF000080");
    });
  });

  describe("invalid input", () => {
    it("returns empty array", () => {
      expect(compute("not-a-color")).toHaveLength(0);
    });
  });
});
