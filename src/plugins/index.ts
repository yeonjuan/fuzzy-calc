import { registerPlugin } from "../core/engine";
import hexColorPlugin from "./hex-color";
import jwtPlugin from "./jwt";

registerPlugin(hexColorPlugin);
registerPlugin(jwtPlugin);
