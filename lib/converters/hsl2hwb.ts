import { HSL, HWB } from "../types";
import hsl2rgb from "./hsl2rgb";
import rgb2hwb from "./rgb2hwb";

export default (props: HSL): HWB => {
    return rgb2hwb(hsl2rgb(props));
};
