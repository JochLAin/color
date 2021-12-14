import { fromHSI as computeChromaFromHSI } from "./chroma";

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
    chroma: number = computeChromaFromHSI(hue, saturation_hsi, intensity),
): number => {
    return chroma + intensity * (1 - saturation_hsi);
};

export const fromHSL = (
    saturation_hsl: number,
    lightness: number,
): number => {
    return lightness + saturation_hsl * Math.min(lightness, 1 - lightness);
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return Math.max(red, green, blue);
};
