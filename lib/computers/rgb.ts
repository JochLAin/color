import { COLOR, HEX, HSL, HWB, INT } from "../types";
import { isHEX, isHSL, isHWB, isINT, isRGB } from "../utils";
import { hex2rgb, hsl2rgb, hwb2rgb, int2rgb } from "../converters";

export default (props: COLOR): COLOR => {
    if (isRGB(props)) return props;
    if (isINT(props)) return int2rgb(props as INT);
    if (isHEX(props)) return hex2rgb(props as HEX);
    if (isHSL(props)) return hsl2rgb(props as HSL);
    if (isHWB(props)) return hwb2rgb(props as HWB);
    // if (isNCOL(props)) return NCOLtoRGB(props as NCOL);
    // if (isCMYK(props)) return CMYKtoRGB(props as CMYK);
    throw new Error('Unable to compute rgb value');
};
