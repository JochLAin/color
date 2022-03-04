import { HEX_OBJECT, HSL_OBJECT, RGB_OBJECT, HSL_OPTION, RGB_OPTION } from "./types";

export const createHEX = (): HEX_OBJECT => ({ hex: `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}` });

export const createHSL = (props?: HSL_OPTION): HSL_OBJECT => ({
    hue: props?.hue || Math.random().toFixed(5),
    saturation: props?.saturation || Math.random().toFixed(5),
    lightness: props?.lightness || Math.random().toFixed(5),
});

export const createRGB = (props?: RGB_OPTION): RGB_OBJECT => ({
    red: props?.red || Math.random().toFixed(5),
    green: props?.green || Math.random().toFixed(5),
    blue: props?.blue || Math.random().toFixed(5),
});
