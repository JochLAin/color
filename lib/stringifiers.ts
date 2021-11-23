import { HSL, HWB, RGB } from "./types";

export const stringifyHSL = (props: HSL): string => {
    const { hue, saturation, lightness, alpha = 100 } = props;

    if (alpha !== 100) {
        return `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${Math.round(alpha)}%)`;
    }
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
};

export const stringifyHWB = (props: HWB): string => {
    const { hue, whiteness, blackness, alpha = 100 } = props;

    if (alpha !== 100) {
        return `hsla(${Math.round(hue)}, ${Math.round(whiteness)}%, ${Math.round(blackness)}%, ${Math.round(alpha)}%)`;
    }
    return `hsl(${Math.round(hue)}, ${Math.round(whiteness)}%, ${Math.round(blackness)}%)`;
};

export const stringifyRGB = (props: RGB): string => {
    const { red, green, blue, alpha = 100 } = props;

    if (alpha !== 100) {
        return `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${Math.round(alpha)}%)`;
    }
    return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
};
