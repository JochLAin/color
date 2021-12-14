import { fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromRGB as computeChromaFromRGB } from "./chroma";
import { fromRGB as computeWhiteFromRGB } from "./white";
import { fromHSV as computeLightnessFromHSV, fromRGB as computeLightnessFromRGB } from "./lightness";

export const fromHSV = (
    saturation_hsv: number,
    brightness: number,
    lightness: number = computeLightnessFromHSV(saturation_hsv, brightness)
): number => {
    if (brightness === 0) return 0;
    return (brightness - lightness) / Math.min(lightness, 1 - lightness);
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    white: number = computeWhiteFromRGB(red, green, blue),
    brightness: number = computeBrightnessFromRGB(red, green, blue),
    chroma: number = computeChromaFromRGB(red, green, blue, white, brightness),
    lightness: number = computeLightnessFromRGB(red, green, blue, white, brightness),
): number => {
    if ([0, 1].includes(lightness)) return 0;
    if (lightness < 0.5) return chroma / (brightness + white);
    return chroma / (2.0 - chroma);
};
