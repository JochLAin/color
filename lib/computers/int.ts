import { hex2int, hsl2int, rgb2int } from "../converters";
import { COLOR, HEX, HSL, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isINT(props)) return props;
    if (isHEX(props)) return hex2int(props as HEX);
    if (isRGB(props)) return rgb2int(props as RGB);
    if (isHSL(props)) return hsl2int(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute number value');
};
