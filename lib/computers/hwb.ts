import { COLOR, NCOL, RGB } from "../types";
import { isHWB, isNCOL, isRGB } from "../utils";
import { ncol2hwb, rgb2hwb } from "../converters";

export default (props: COLOR): COLOR => {
    if (isHWB(props)) return props;
    // if (isINT(props)) return INTtoHWB(props as INT);
    // if (isHEX(props)) return HEXtoHWB(props as HEX);
    if (isRGB(props)) return rgb2hwb(props as RGB);
    // if (isHSL(props)) return HSLtoHWB(props as HSL);
    if (isNCOL(props)) return ncol2hwb(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHWB(props as CMYK);
    throw new Error('Unable to compute hwb value');
};
