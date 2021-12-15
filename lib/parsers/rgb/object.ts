import { srgb2rgb } from "../../converters";
import { RGB, sRGB } from "../../types";
import { isSRGB } from "../../utils";
import { getValidRGB } from "../../validators";

export default (props: RGB | sRGB): RGB => {
    if (typeof props === 'object' && isSRGB(props)) {
        props = srgb2rgb(props as sRGB);
    }
    return getValidRGB(props as RGB);
};
