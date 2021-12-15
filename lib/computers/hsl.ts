import { COLOR, HEX, INT, RGB } from "../types";
import { isHEX, isHSL, isINT, isRGB } from "../utils";
import { hex2hsl, int2hsl, rgb2hsl } from "../converters";

export default (props: COLOR): COLOR => {
    if (isHSL(props)) return props;
    if (isINT(props)) return int2hsl(props);
    if (isHEX(props)) return hex2hsl(props);
    if (isRGB(props)) return rgb2hsl(props);
    // if (isHWB(props)) return HWBtoHSL(props);
    // if (isNCOL(props)) return NCOLtoHSL(props);
    // if (isCMYK(props)) return CMYKtoHSL(props);
    throw new Error('Unable to compute hsl value');
};
