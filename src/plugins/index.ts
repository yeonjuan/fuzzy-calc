import { registerPlugin, registerFilePlugin } from "../core/engine";
import videoToGifPlugin from "./video-to-gif";
import svgPlugin from "./svg";
import hexColorPlugin from "./hex-color";
import jwtPlugin from "./jwt";
import rgbPlugin from "./rgb";
import hslPlugin from "./hsl";
import jsonPlugin from "./json";
import arithmeticPlugin from "./arithmetic";
import cronPlugin from "./cron";
import unixTimePlugin from "./unix-time";
import base64Plugin from "./base64";
import numberBasePlugin from "./number-base";

registerPlugin(svgPlugin);
registerPlugin(hexColorPlugin);
registerPlugin(rgbPlugin);
registerPlugin(hslPlugin);
registerPlugin(jwtPlugin);
registerPlugin(jsonPlugin);
registerPlugin(arithmeticPlugin);
registerPlugin(cronPlugin);
registerPlugin(unixTimePlugin);
registerPlugin(base64Plugin);
registerPlugin(numberBasePlugin);

registerFilePlugin(videoToGifPlugin);
