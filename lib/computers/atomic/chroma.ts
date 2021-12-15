import { fromRGB as computeBrightnessFromRGB } from './brightness';
import { fromRGB as computeWhiteFromRGB } from './white';

export const fromMinMax = (
    brightness: number,
    lightness: number
): number => {
    return 2 * (brightness - lightness);
};

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
): number => {
    return (3 * intensity * saturation_hsi) / (2 - Math.abs(hue / 60 % 2 - 1));
};

export const fromHSL = (
    saturation_hsl: number,
    lightness: number,
): number => {
    return (1 - Math.abs(2 * lightness - 1)) * saturation_hsl;
};

export const fromHSV = (
    saturation_hsv: number,
    brightness: number,
): number => {
    return saturation_hsv * brightness;
};

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    brightness: number = computeBrightnessFromRGB(red, green, blue),
    white: number = computeWhiteFromRGB(red, green, blue),
): number => {
    return brightness - white;
};
