import { COLOR, NCOL, RGB } from "../types";
import { isHWB, isNCOL, isRGB } from "../utils";
import { ncol2hwb, rgb2hwb } from "../converters";

export default (props: COLOR): COLOR => {
    if (isHWB(props)) return props;
    // if (isINT(props)) return INTtoHWB(props);
    // if (isHEX(props)) return HEXtoHWB(props);
    if (isRGB(props)) return rgb2hwb(props);
    // if (isHSL(props)) return HSLtoHWB(props);
    if (isNCOL(props)) return ncol2hwb(props);
    // if (isCMYK(props)) return CMYKtoHWB(props);
    throw new Error('Unable to compute hwb value');
};
