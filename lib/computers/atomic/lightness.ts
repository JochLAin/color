import { fromHSI as computeWhiteFromHSI, fromRGB as computeWhiteFromRGB } from "./white";
import { fromHSI as computeBrightnessFromHSI, fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromHSI as computeChromaFromHSI } from "./chroma";

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
    chroma: number = computeChromaFromHSI(hue, saturation_hsi, intensity),
    white: number = computeWhiteFromHSI(saturation_hsi, intensity),
    brightness: number = computeBrightnessFromHSI(hue, saturation_hsi, intensity, chroma),
): number => {
    return (brightness + white) / 2;
};

export const fromHSV = (
    saturation_hsv: number,
    brightness: number,
): number => {
    return brightness * (1 - saturation_hsv / 2);
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    white: number = computeWhiteFromRGB(red, green, blue),
    brightness: number = computeBrightnessFromRGB(red, green, blue),
): number => {
    return (brightness + white) / 2;
};
