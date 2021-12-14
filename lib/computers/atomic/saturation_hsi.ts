import { fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromRGB as computeIntensityFromRGB } from "./intensity";

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    brightness: number = computeBrightnessFromRGB(red, green, blue),
    intensity: number = computeIntensityFromRGB(red, green, blue),
): number => {
    if (intensity === 0) return 0;
    return 1 - brightness / intensity;
};

export const fromHSL = (
    hue: number,
    saturation_hsl: number,
    lightness: number,
): number => {
    return 0;
};
