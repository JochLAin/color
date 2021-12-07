import { HEX, HSL } from "../types";
import hex2rgb from "./hex2rgb";
import rgb2hsl from "./rgb2hsl";

export default (props: HEX): HSL => {
    return rgb2hsl(hex2rgb(props));
};
