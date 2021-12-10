import { COLOR, HEX, INT, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";
import { hex2hsl, int2hsl, rgb2hsl } from "../converters";

export default (props: COLOR): COLOR => {
    if (isHSL(props)) return props;
    if (isINT(props)) return int2hsl(props as INT);
    if (isHEX(props)) return hex2hsl(props as HEX);
    if (isRGB(props)) return rgb2hsl(props as RGB);
    // if (isHWB(props)) return HWBtoHSL(props as HWB);
    // if (isNCOL(props)) return NCOLtoHSL(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHSL(props as CMYK);
    throw new Error('Unable to compute hsl value');
};
