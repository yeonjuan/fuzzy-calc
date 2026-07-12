import { describe, it, expect } from "vitest";
import { compute } from "./calculator";

describe("hex-color calculator", () => {
  describe("RGB output", () => {
    it("3-digit hex", () => {
      const result = compute("#fff");
      expect(result.find((r) => r.label === "RGB")?.value).toBe("rgb(255, 255, 255)");
    });

    it("6-digit hex", () => {
      const result = compute("#ff6b6b");
      expect(result.find((r) => r.label === "RGB")?.value).toBe("rgb(255, 107, 107)");
    });

    it("8-digit hex includes alpha in rgba()", () => {
      const result = compute("#ff6b6b80");
      expect(result.find((r) => r.label === "RGB")?.value).toBe("rgba(255, 107, 107, 0.5)");
    });

    it("fully transparent #00000000", () => {
      const result = compute("#00000000");
      expect(result.find((r) => r.label === "RGB")?.value).toBe("rgba(0, 0, 0, 0)");
    });

    it("fully opaque #ffffffff", () => {
      const result = compute("#ffffffff");
      expect(result.find((r) => r.label === "RGB")?.value).toBe("rgba(255, 255, 255, 1)");
    });
  });

  describe("HSL output", () => {
    it("black → hsl(0, 0%, 0%)", () => {
      const result = compute("#000000");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 0%, 0%)");
    });

    it("white → hsl(0, 0%, 100%)", () => {
      const result = compute("#ffffff");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 0%, 100%)");
    });

    it("pure red → hsl(0, 100%, 50%)", () => {
      const result = compute("#ff0000");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(0, 100%, 50%)");
    });

    it("pure green → hsl(120, 100%, 50%)", () => {
      const result = compute("#00ff00");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(120, 100%, 50%)");
    });

    it("pure blue → hsl(240, 100%, 50%)", () => {
      const result = compute("#0000ff");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsl(240, 100%, 50%)");
    });

    it("8-digit hex includes alpha in hsla()", () => {
      const result = compute("#ff000080");
      expect(result.find((r) => r.label === "HSL")?.value).toBe("hsla(0, 100%, 50%, 0.5)");
    });
  });
});
