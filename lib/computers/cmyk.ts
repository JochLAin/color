import { rgb2cmyk } from "../converters";
import { COLOR, RGB } from "../types";
import { isCMYK, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isCMYK(props)) return props;
    // if (isINT(props)) return INTtoCMYK(props as INT);
    if (isRGB(props)) return rgb2cmyk(props as RGB);
    // if (isHSL(props)) return HSLtoCMYK(props as HSL);
    // if (isHWB(props)) return HWBtoCMYK(props as HWB);
    // if (isNCOL(props)) return NCOLtoCMYK(props as NCOL);
    throw new Error('Unable to compute cmyk value');
};
