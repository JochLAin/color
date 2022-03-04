import { srgb2rgb } from "../../converters";
import { RGB_OBJECT, RGB_SHORTCUT } from "../../types";
import { isShortcutRGB } from "../../testers";
import { getValidRGB } from "../../validators";

export default (props: RGB_OBJECT | RGB_SHORTCUT): RGB_OBJECT => {
    if (isShortcutRGB(props)) {
        return srgb2rgb(props);
    }
    return getValidRGB(props);
};
