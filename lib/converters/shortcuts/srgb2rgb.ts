import { RGB_OBJECT, RGB_SHORTCUT } from "../../types";
import { getValidRGB } from "../../validators";

export default (props: RGB_SHORTCUT): RGB_OBJECT => {
    const { r: red, g: green, b: blue, a: alpha } = props;
    return getValidRGB({ red, green, blue, alpha });
};
