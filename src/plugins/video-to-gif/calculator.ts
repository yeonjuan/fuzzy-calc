import type { ResultItem } from "../../core/types";

const MAX_DIMENSION = 480;
const FPS = 10;
const MAX_FRAMES = 300;

async function convertVideoToGif(file: File): Promise<Blob> {
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");

  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;

  await new Promise<void>((resolve, reject) => {
    video.addEventListener("loadedmetadata", () => resolve(), { once: true });
    video.addEventListener("error", () => reject(new Error("Failed to load video")), {
      once: true,
    });
  });

  let width = video.videoWidth;
  let height = video.videoHeight;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  const encoder = GIFEncoder();
  const delay = Math.round(1000 / FPS);
  const totalFrames = Math.min(Math.round(video.duration * FPS), MAX_FRAMES);

  for (let i = 0; i < totalFrames; i++) {
    video.currentTime = i / FPS;
    await new Promise<void>((resolve) => {
      video.addEventListener("seeked", () => resolve(), { once: true });
    });
    ctx.drawImage(video, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    encoder.writeFrame(index, width, height, { palette, delay });
  }

  encoder.finish();
  URL.revokeObjectURL(url);

  return new Blob([encoder.bytes().buffer as ArrayBuffer], { type: "image/gif" });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function compute(file: File): ResultItem[] {
  const gifName = file.name.replace(/\.[^.]+$/, ".gif");
  return [
    {
      label: "Video",
      value: file.name,
      type: "text",
      actions: [
        {
          label: "Convert to GIF",
          onClick: async () => {
            const blob = await convertVideoToGif(file);
            downloadBlob(blob, gifName);
          },
        },
      ],
    },
  ];
}
