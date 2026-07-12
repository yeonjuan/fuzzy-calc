import { registerPlugin } from "../core/engine";
import hexColorPlugin from "./hex-color";
import jwtPlugin from "./jwt";
import rgbPlugin from "./rgb";
import hslPlugin from "./hsl";

registerPlugin(hexColorPlugin);
registerPlugin(rgbPlugin);
registerPlugin(hslPlugin);
registerPlugin(jwtPlugin);
