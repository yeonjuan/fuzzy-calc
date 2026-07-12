import { registerPlugin } from "../core/engine";
import hexColorPlugin from "./hex-color";
import jwtPlugin from "./jwt";
import rgbPlugin from "./rgb";

registerPlugin(hexColorPlugin);
registerPlugin(rgbPlugin);
registerPlugin(jwtPlugin);
