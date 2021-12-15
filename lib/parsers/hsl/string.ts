import { HSL_REGEX } from "../../constants";
import { HSL } from "../../types";
import { getValidHSL } from "../../validators";

export default (props: string): HSL => {
    const match = props.match(HSL_REGEX);
    if (!match) throw new Error(`HSL string must match with ${HSL_REGEX.toString()}`);

    return getValidHSL({
        hue: Number(match[1]),
        saturation: Number(match[2]),
        lightness: Number(match[3]),
        alpha: Number(match[5] || 100)
    });
};
