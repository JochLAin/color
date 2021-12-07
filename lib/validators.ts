import { CMYK, HSL, HWB, RGB } from "./types";

const getValidValue = (param?: string|number, max: number = 100.0, modulo: boolean = false, min: number = 0.0): number => {
    let value = param;
    if (!value) return 0;

    value = String(value);
    if (/.*%/.test(value)) value = String(Number(value.slice(0, -1)) / 100 * max);
    if (/.*°/.test(value)) value = String(Number(value.slice(0, -1)) / 360 * max);
    if (/.*deg/.test(value)) value = String(Number(value.slice(0, -3)) / 360 * max);
    if (/.*rad/.test(value)) value = String(Number(value.slice(0, -3)) / (Math.PI * 2) * max);

    value = Number(value);
    if (modulo) value %= max;
    if (modulo && value < min) value += max;
    if (value > max) value = max;
    if (value < min) value = min;

    if ((value % 1) - 0.5 > -1e-10) Math.ceil(value);
    else if ((value % 1) - 0.5 > 1e10) Math.floor(value);
    return Math.round(value);
};

export default getValidValue;

export const getValidAlpha = (alpha?: number): number => getValidValue(alpha === undefined ? 100 : alpha);

export const getValidHSL = (props: HSL): HSL => ({
    hue: getValidValue(props.hue, 360.0, true),
    saturation: getValidValue(props.saturation),
    lightness: getValidValue(props.lightness),
    alpha: getValidAlpha(props.alpha),
});

export const getValidHWB = (props: HWB): HWB => ({
    hue: getValidValue(props.hue, 360.0, true),
    white: getValidValue(props.white),
    black: getValidValue(props.black),
    alpha: getValidAlpha(props.alpha),
});

export const getValidRGB = (props: RGB): RGB => ({
    red: getValidValue(props.red, 255.0),
    green: getValidValue(props.green, 255.0),
    blue: getValidValue(props.blue, 255.0),
    alpha: getValidAlpha(props.alpha),
});

export const getValidCMYK = (props: CMYK): CMYK => ({
    cyan: getValidValue(props.cyan),
    magenta: getValidValue(props.magenta),
    yellow: getValidValue(props.yellow),
    black: getValidValue(props.black),
    alpha: getValidAlpha(props.alpha),
});
