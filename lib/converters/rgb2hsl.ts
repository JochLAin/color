import { HSL, RGB } from "../types";
import { getValidHSL } from "../validators";
import rgb2hue from "./rgb2hue";

export default (props: RGB, hue?: number): HSL => {
    let { red, green, blue } = props;
    red /= 255.0; green /= 255.0; blue /= 255.0;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    const sum = max + min;

    const lightness = sum / 2.0;
    if (min === max) {
        return getValidHSL({
            hue: 0.0,
            saturation: 0.0,
            lightness: lightness * 100.0,
        });
    }

    let saturation = delta / (2.0 - delta);
    if (lightness < 0.5) saturation = delta / sum;
    return getValidHSL({
        hue: hue || rgb2hue({ red, green, blue }, min, max),
        saturation: saturation * 100.0,
        lightness: lightness * 100.0,
    });
};
