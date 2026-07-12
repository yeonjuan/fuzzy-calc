import { registerPlugin } from "../core/engine";
import hexColorPlugin from "./hex-color";
import jwtPlugin from "./jwt";
import rgbPlugin from "./rgb";
import hslPlugin from "./hsl";
import jsonPlugin from "./json";
import arithmeticPlugin from "./arithmetic";
import cronPlugin from "./cron";

registerPlugin(hexColorPlugin);
registerPlugin(rgbPlugin);
registerPlugin(hslPlugin);
registerPlugin(jwtPlugin);
registerPlugin(jsonPlugin);
registerPlugin(arithmeticPlugin);
registerPlugin(cronPlugin);
