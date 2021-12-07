import { HSL, RGB } from "../types";
import { getValidRGB } from "../validators";

export const hue2rgb = (hue: number, tmp1: number, tmp2: number): number => {
    if (hue < 0.0) hue += 6.0;
    hue %= 6.0;
    if (hue < 1.0) return (tmp1 - tmp2) * hue + tmp2;
    if (hue < 3.0) return tmp1;
    if (hue < 4.0) return (tmp1 - tmp2) * (4.0 - hue) + tmp2;
    return tmp2;
};

export default (props: HSL): RGB => {
    let { hue, saturation, lightness } = props;
    hue /= 60; saturation /= 100.0; lightness /= 100.0;

    if (saturation === 0) {
        const value = lightness * 255.0;
        return getValidRGB({ red: value, green: value, blue: value });
    }

    if (lightness === 0) {
        return getValidRGB({ red: 0.0, green: 0.0, blue: 0.0 });
    }
    if (lightness === 1) {
        return getValidRGB({ red: 255.0, green: 255.0, blue: 255.0 });
    }

    const tmp1 = lightness <= 0.5 ? (lightness * (1 + saturation)) : (lightness + saturation - lightness * saturation);
    const tmp2 = 2.0 * lightness - tmp1;
    return getValidRGB({
        red: hue2rgb(hue + 2, tmp1, tmp2) * 255.0,
        green: hue2rgb(hue, tmp1, tmp2) * 255.0,
        blue: hue2rgb(hue - 2, tmp1, tmp2) * 255.0,
    });
};
