import { COLOR, HEX, HSL } from "../types";
import hsl2rgb from "./hsl2rgb";
import rgb2hex from "./rgb2hex";

export default (props: COLOR & HSL): HEX => {
    return rgb2hex(hsl2rgb(props));
}
