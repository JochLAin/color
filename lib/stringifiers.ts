import { CMYK, HSL, HWB, RGB } from "./types";
import { isCMYK, isHSL, isHWB, isRGB } from "./utils";

export const stringifyCMYK = (props: CMYK): string => {
    if (!isCMYK(props)) throw new Error(`Not a valid CMYK => ${JSON.stringify(props)}`);
    const { cyan, magenta, yellow, black } = props;
    return `cmyk(${Math.round(cyan)}%, ${Math.round(magenta)}%, ${Math.round(yellow)}%, ${Math.round(black)}%)`;
};

export const stringifyHSL = (props: HSL): string => {
    if (!isHSL(props)) throw new Error(`Not a valid HSL => ${JSON.stringify(props)}`);
    const { hue, saturation, lightness, alpha = 100 } = props;

    if (alpha !== 100) {
        return `hsla(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%, ${Math.round(alpha)}%)`;
    }
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
};

export const stringifyHWB = (props: HWB): string => {
    if (!isHWB(props)) throw new Error(`Not a valid HWB => ${JSON.stringify(props)}`);
    const { hue, white, black, alpha = 100 } = props;

    if (alpha !== 100) {
        return `hwba(${Math.round(hue)}, ${Math.round(white)}%, ${Math.round(black)}%, ${Math.round(alpha)}%)`;
    }
    return `hwb(${Math.round(hue)}, ${Math.round(white)}%, ${Math.round(black)}%)`;
};

export const stringifyRGB = (props: RGB): string => {
    if (!isRGB(props)) throw new Error(`Not a valid RGB => ${JSON.stringify(props)}`);
    const { red, green, blue, alpha = 100 } = props;

    if (alpha !== 100) {
        return `rgba(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}, ${Math.round(alpha)}%)`;
    }
    return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
};
