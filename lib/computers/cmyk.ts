import { rgb2cmyk } from "../converters";
import { COLOR, RGB } from "../types";
import { isCMYK, isRGB } from "../utils";

export default (props: COLOR): COLOR => {
    if (isCMYK(props)) return props;
    // if (isINT(props)) return INTtoCMYK(props);
    if (isRGB(props)) return rgb2cmyk(props);
    // if (isHSL(props)) return HSLtoCMYK(props);
    // if (isHWB(props)) return HWBtoCMYK(props);
    // if (isNCOL(props)) return NCOLtoCMYK(props);
    throw new Error('Unable to compute cmyk value');
};
