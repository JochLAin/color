import { hex2int, hsl2int, rgb2int } from "../converters";
import { COLOR, HEX, HSL, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isINT(props)) return props;
    if (isHEX(props)) return hex2int(props);
    if (isRGB(props)) return rgb2int(props);
    if (isHSL(props)) return hsl2int(props);
    // if (isHWB(props)) return HWBtoINT(props);
    // if (isNCOL(props)) return NCOLtoINT(props);
    // if (isCMYK(props)) return CMYKtoINT(props);
    throw new Error('Unable to compute number value');
};
