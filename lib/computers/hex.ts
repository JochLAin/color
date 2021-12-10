import { hsl2hex, int2hex, rgb2hex } from "../converters";
import { COLOR, HSL, INT, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isHEX(props)) return props;
    if (isINT(props)) return int2hex(props as INT);
    if (isRGB(props)) return rgb2hex(props as RGB);
    if (isHSL(props)) return hsl2hex(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute hex value');
};
