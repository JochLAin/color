import { HEX_REGEX } from "../../constants";
import { getChannelRGBFromHSI, getChannelRGBFromHSL, getChannelRGBFromHSV } from "../../utils";

export const fromHEX = (
    hex: string,
    matches: RegExpMatchArray|null = hex.match(HEX_REGEX),
): number => {
    if (!matches) return 0;
    return parseInt(matches[1].slice(2, 4), 16);
};

export const fromHSI = (
    hue: number,
    saturation_hsi: number,
    intensity: number,
): number => {
    return getChannelRGBFromHSI(8, hue, saturation_hsi, intensity);
};

export const fromHSL = (
    hue: number,
    saturation_hsl: number,
    lightness: number,
): number => {
    return getChannelRGBFromHSL(8, hue, saturation_hsl, lightness);
};

export const fromHSV = (
    hue: number,
    saturation_hsv: number,
    brightness: number,
): number => {
    return getChannelRGBFromHSV(3, hue, saturation_hsv, brightness);
};
