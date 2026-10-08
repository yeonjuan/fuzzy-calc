import type { Plugin } from "../../core/types";

// http://, https://, or any custom app scheme (e.g. myapp://, fb://)
const URL_RE = /^[a-z][a-z0-9+.-]*:\/\/\S+$/i;

const qrCodePlugin: Plugin = {
  id: "qr-code",
  name: "QR Code",
  meta: {
    description: "Generate QR code from URL or app scheme link",
    examples: ["https://example.com", "myapp://open?id=42"],
    output: "QR Code (SVG)",
  },
  detect: (input) => URL_RE.test(input.trim()),
  calculate: async (input) => {
    const { compute } = await import("./calculator");
    return compute(input);
  },
};

export default qrCodePlugin;
