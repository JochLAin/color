import { HEX_REGEX } from "../../constants";
import { getChannelRGBFromHSI, getChannelRGBFromHSL, getChannelRGBFromHSV } from "../../utils";

export const fromHEX = (
    hex: string,
    matches: RegExpMatchArray|null = hex.match(HEX_REGEX),
): number => {
    if (!matches) return 0;
    return parseInt(matches[1].slice(0, 2), 16);
};

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
): number => {
    return getChannelRGBFromHSI(0, hue, saturation_hsi, intensity);
};

export const fromHSL = (
    hue: number,
    saturation_hsl: number,
    lightness: number,
): number => {
    return getChannelRGBFromHSL(0, hue, saturation_hsl, lightness);
};

export const fromHSV = (
    hue: number,
    saturation_hsv: number,
    brightness: number,
): number => {
    return getChannelRGBFromHSV(5, hue, saturation_hsv, brightness);
};

export const fromHWB = (
    hue: number,
    white: number,
    black: number,
): number => {
    return 0;
};

export const fromINT = (
    int: number,
): number => {
    return (int & 0xFF0000) / 0xFF;
};
