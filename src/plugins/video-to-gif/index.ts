import type { FilePlugin } from "../../core/types";

const videoToGifPlugin: FilePlugin = {
  id: "video-to-gif",
  name: "Video to GIF",
  detectFile: (file) => file.type.startsWith("video/"),
  calculateFile: async (file) => {
    const { compute } = await import("./calculator");
    return compute(file);
  },
};

export default videoToGifPlugin;
