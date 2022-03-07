import { HSL_OBJECT, HSL_SHORTCUT } from "../../types";

export default (props: HSL_SHORTCUT): HSL_OBJECT => {
    const { h: hue, s: saturation, l: lightness, a: alpha } = props;
    return { hue, saturation, lightness, alpha };
};
