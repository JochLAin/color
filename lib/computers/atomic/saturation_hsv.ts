import { fromHSL as computeBrightnessFromHSL, fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromRGB as computeChromaFromRGB } from "./chroma";
import { fromRGB as computeWhiteFromRGB } from "./white";

export const fromHSL = (
    saturation_hsl: number,
    lightness: number,
    brightness: number = computeBrightnessFromHSL(saturation_hsl, lightness),
): number => {
    if (brightness === 0) return 0;
    return 2 * (1 - lightness / brightness);
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    white: number = computeWhiteFromRGB(red, green, blue),
    brightness: number = computeBrightnessFromRGB(red, green, blue),
    chroma: number = computeChromaFromRGB(red, green, blue, white, brightness),
): number => {
    if (brightness === 0) return 0;
    return chroma / brightness;
};
