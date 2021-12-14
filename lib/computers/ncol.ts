import { COLOR, RGB } from "../types";
import { isRGB } from "../utils";
import { rgb2ncol } from "../converters";

export default (props: COLOR): COLOR => {
    if (isRGB(props)) return rgb2ncol(props);
    throw new Error('Unable to compute ncol value');
};
