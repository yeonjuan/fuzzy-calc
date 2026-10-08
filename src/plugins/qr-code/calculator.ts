import QRCode from "qrcode";
import type { ResultItem } from "../../core/types";

export async function compute(input: string): Promise<ResultItem[]> {
  const value = input.trim();
  const svg = await QRCode.toString(value, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
  });

  return [{ label: "QR Code", value: svg, type: "svg" }];
}
