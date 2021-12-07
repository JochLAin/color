import { HSL, sHSL } from "../../types";

export default (props: sHSL): HSL => {
    const { h: hue, s: saturation, l: lightness, a: alpha } = props;
    return { hue, saturation, lightness, alpha };
};
