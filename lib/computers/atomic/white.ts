import { fromHSL as computeChromaFromHSL, fromHSV as computeChromaFromHSV } from "./chroma";

export const fromHSI = (
    saturation_hsi: number,
    intensity: number,
) => {
    return intensity - (1 - saturation_hsi);
};

export const fromHSL = (
    saturation_hsl: number,
    lightness: number,
    chroma: number = computeChromaFromHSL(saturation_hsl, lightness),
): number => {
    return lightness - chroma / 2;
};

export const fromHSV = (
    saturation_hsv: number,
    brightness: number,
    chroma: number = computeChromaFromHSV(saturation_hsv, brightness),
): number => {
    return brightness - chroma;
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return Math.min(red, green, blue);
};
