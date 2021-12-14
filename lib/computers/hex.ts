import { hsl2hex, int2hex, rgb2hex } from "../converters";
import { COLOR, HSL, INT, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isHEX(props)) return props;
    if (isINT(props)) return int2hex(props);
    if (isRGB(props)) return rgb2hex(props);
    if (isHSL(props)) return hsl2hex(props);
    // if (isHWB(props)) return HWBtoINT(props);
    // if (isNCOL(props)) return NCOLtoINT(props);
    // if (isCMYK(props)) return CMYKtoINT(props);
    throw new Error('Unable to compute hex value');
};
