import { CMYK, HEX, HSL, HWB, INT, NCOL, RGB, sCMYK, sHSL, sHWB, sRGB } from "./types";

export const getChannelRGBFromHSI = (
    idx: number,
    hue: number,
    saturation_hsi: number,
    intensity: number,
): number => {
    const k = (idx + hue / 30) % 12;
    return 0;
};

export const getChannelRGBFromHSL = (
    idx: number,
    hue: number,
    saturation_hsl: number,
    lightness: number,
): number => {
    const k = (idx + hue / 30) % 12;
    const a = saturation_hsl * Math.min(lightness, 1 - lightness);
    return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
};

export const getChannelRGBFromHSV = (
    idx: number,
    hue: number,
    saturation_hsv: number,
    brightness: number,
): number => {
    const k = (idx + hue / 60) % 6;
    return brightness - brightness * saturation_hsv * Math.max(0, Math.min(k, 4 - k, 1));
};

export const isCMYK = (props: any): props is CMYK => {
    return 'cyan' in props && props.cyan !== undefined
        && 'magenta' in props && props.magenta !== undefined
        && 'yellow' in props && props.yellow !== undefined
        && 'black' in props && props.black !== undefined
    ;
};

export const isSCMYK = (props: any): props is sCMYK => {
    return 'c' in props && props.c !== undefined
        && 'm' in props && props.m !== undefined
        && 'y' in props && props.y !== undefined
        && 'k' in props && props.k !== undefined
    ;
};

export const isHEX = (props: any): props is HEX => {
    return 'hex' in props && props.hex !== undefined;
};

export const isHSL = (props: any): props is HSL => {
    return 'hue' in props && props.hue !== undefined
        && 'saturation' in props && props.saturation !== undefined
        && 'lightness' in props && props.lightness !== undefined
    ;
};

export const isSHSL = (props: any): props is sHSL => {
    return 'h' in props && props.h !== undefined
        && 's' in props && props.s !== undefined
        && 'l' in props && props.l !== undefined
    ;
};

export const isHWB = (props: any): props is HWB => {
    return 'hue' in props && props.hue !== undefined
        && 'white' in props && props.white !== undefined
        && 'black' in props && props.black !== undefined
    ;
};

export const isSHWB = (props: any): props is sHWB => {
    return 'h' in props && props.h !== undefined
        && 'w' in props && props.w !== undefined
        && 'b' in props && props.b !== undefined
    ;
};

export const isINT = (props: any): props is INT => {
    return 'value' in props && props.value !== undefined;
};

export const isNCOL = (props: any): props is NCOL => {
    return 'ncol' in props && props.ncol !== undefined
        && 'white' in props && props.white !== undefined
        && 'black' in props && props.black !== undefined
        && 'alpha' in props && props.alpha !== undefined
    ;
};

export const isRGB = (props: any): props is RGB => {
    return 'red' in props && props.red !== undefined
        && 'green' in props && props.green !== undefined
        && 'blue' in props && props.blue !== undefined
    ;
};

export const isSRGB = (props: any): props is sRGB => {
    return 'r' in props && props.r !== undefined
        && 'g' in props && props.g !== undefined
        && 'b' in props && props.b !== undefined
    ;
};
