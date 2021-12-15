import { fromHSI as computeBrightnessFromHSI, fromHSL as computeBrightnessFromHSL, fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromHSI as computeChromaFromHSI } from "./chroma";

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
    chroma: number = computeChromaFromHSI(hue, saturation_hsi, intensity),
    brightness: number = computeBrightnessFromHSI(hue, saturation_hsi, intensity, chroma),
): number => {
    return 1 - brightness;
};

export const fromHSL = (
    saturation_hsl: number,
    lightness: number,
    brightness: number = computeBrightnessFromHSL(saturation_hsl, lightness),
): number => {
    return 1 - brightness;
};

export const fromHSV = (
    brightness: number,
): number => {
    return 1 - brightness;
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    brightness: number = computeBrightnessFromRGB(red, green, blue),
): number => {
    return 1 - brightness;
};
