import { HEX, HSL } from "../types";
import hsl2rgb from "./hsl2rgb";
import rgb2hex from "./rgb2hex";

export default (props: HSL): HEX => {
    return rgb2hex(hsl2rgb(props));
}
