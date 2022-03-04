import { HSL_OBJECT, HSL_SHORTCUT } from "../../types";
import { getValidHSL } from "../../validators";

export default (props: HSL_SHORTCUT): HSL_OBJECT => {
    const { h: hue, s: saturation, l: lightness, a: alpha } = props;
    return getValidHSL({ hue, saturation, lightness, alpha });
};
