import { CMYK_OBJECT, HWB_OBJECT, HSL_OBJECT, RGB_OBJECT } from "./types";

export const normalizeCMYK = (cmyk: CMYK_OBJECT): CMYK_OBJECT => ({
    cyan: _percent(cmyk.cyan),
    magenta: _percent(cmyk.magenta),
    yellow: _percent(cmyk.yellow),
    black: _percent(cmyk.black),
    alpha: _alpha(typeof cmyk.alpha === 'undefined' ? 1 : cmyk.alpha),
});

export const normalizeHWB = (hwb: HWB_OBJECT): HWB_OBJECT => ({
    hue: _angle(hwb.hue),
    white: _percent(hwb.white),
    black: _percent(hwb.black),
    alpha: _alpha(typeof hwb.alpha === 'undefined' ? 1 : hwb.alpha),
});

export const normalizeHSL = (hsl: HSL_OBJECT): HSL_OBJECT => ({
    hue: _angle(hsl.hue),
    saturation: _percent(hsl.saturation),
    lightness: _percent(hsl.lightness),
    alpha: _alpha(typeof hsl.alpha === 'undefined' ? 1 : hsl.alpha),
});

export const normalizeRGB = (rgb: RGB_OBJECT): RGB_OBJECT => ({
    red: _channel(rgb.red),
    blue: _channel(rgb.blue),
    green: _channel(rgb.green),
    alpha: _alpha(typeof rgb.alpha === 'undefined' ? 1 : rgb.alpha),
});
