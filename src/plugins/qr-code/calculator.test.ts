import { describe, it, expect } from "vitest";
import { compute } from "./calculator";
import qrCodePlugin from "./index";

describe("qr-code detect", () => {
  it("matches http:// and https://", () => {
    expect(qrCodePlugin.detect("http://example.com")).toBe(true);
    expect(qrCodePlugin.detect("https://example.com/path?q=1")).toBe(true);
  });

  it("matches custom app schemes", () => {
    expect(qrCodePlugin.detect("myapp://open?id=42")).toBe(true);
    expect(qrCodePlugin.detect("fb://profile/1")).toBe(true);
  });

  it("ignores surrounding whitespace", () => {
    expect(qrCodePlugin.detect("  https://example.com  ")).toBe(true);
  });

  it("rejects non-URL input", () => {
    expect(qrCodePlugin.detect("hello world")).toBe(false);
    expect(qrCodePlugin.detect("example.com")).toBe(false);
    expect(qrCodePlugin.detect("https://")).toBe(false);
    expect(qrCodePlugin.detect("://nope")).toBe(false);
    expect(qrCodePlugin.detect("https:/example.com")).toBe(false);
  });
});

describe("qr-code calculator", () => {
  it("returns an SVG result", async () => {
    const result = await compute("https://example.com");
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("QR Code");
    expect(result[0].type).toBe("svg");
    expect(result[0].value).toMatch(/^<svg[\s>]/);
    expect(result[0].value).toContain("</svg>");
  });

  it("produces different output for different inputs", async () => {
    const [a] = await compute("https://example.com/a");
    const [b] = await compute("https://example.com/b");
    expect(a.value).not.toBe(b.value);
  });

  it("trims input before encoding", async () => {
    const [trimmed] = await compute("  myapp://open  ");
    const [plain] = await compute("myapp://open");
    expect(trimmed.value).toBe(plain.value);
  });
});
