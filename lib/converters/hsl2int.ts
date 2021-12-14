import { COLOR, HSL, INT } from "../types";
import hex2int from "./hex2int";
import hsl2hex from "./hsl2hex";

export default (props: COLOR & HSL): INT => {
    return hex2int(hsl2hex(props));
};
