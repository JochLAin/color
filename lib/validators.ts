import { CMYK_OBJECT, HWB_OBJECT, HSL_OBJECT, RGB_OBJECT } from "./types";

const precision = 1e-10;
export default function getValidValue(param?: string|number, max: number = 1.0, modulo: boolean = false, min: number = 0.0): number {
    if (!param) return 0;
    let value = Number(param);
    if (Number.isNaN(value)) throw new Error(`Value is not a number => ${value}`);

    // value = String(value);
    // if (/.*%/.test(value)) value = String(Number(value.slice(0, -1)) / 100 * max);
    // if (/.*°/.test(value)) value = String(Number(value.slice(0, -1)) / 360 * max);
    // if (/.*deg/.test(value)) value = String(Number(value.slice(0, -3)) / 360 * max);
    // if (/.*rad/.test(value)) value = String(Number(value.slice(0, -3)) / (Math.PI * 2) * max);

    if (modulo) value %= max;
    if (modulo && value < min) value += max;
    if (value > max) value = max;
    if (value < min) value = min;

    if ((value % 1.0) - 0.5 > -(1 / precision)) return Math.ceil(value * precision) / precision;
    else if ((value % 1.0) - 0.5 > precision) return Math.floor(value * precision) / precision;
    return Math.round(value * precision) / precision;
};

export function getValidAlpha(alpha: string|number|undefined): number {
    return getValidValue(alpha === undefined ? 1.0 : alpha);
}

export function getValidCMYK(cmyk: CMYK_OBJECT): CMYK_OBJECT {
    return {
        cyan: getValidValue(cmyk.cyan),
        magenta: getValidValue(cmyk.magenta),
        yellow: getValidValue(cmyk.yellow),
        black: getValidValue(cmyk.black),
        alpha: getValidAlpha(cmyk.alpha),
    };
}

export function getValidHWB(hwb: HWB_OBJECT): HWB_OBJECT {
    return {
        hue: getValidValue(hwb.hue),
        white: getValidValue(hwb.white),
        black: getValidValue(hwb.black),
        alpha: getValidAlpha(hwb.alpha),
    };
}

export function getValidHSL(hsl: HSL_OBJECT): HSL_OBJECT {
    return {
        hue: getValidValue(hsl.hue),
        saturation: getValidValue(hsl.saturation),
        lightness: getValidValue(hsl.lightness),
        alpha: getValidAlpha(hsl.alpha),
    };
}

export function getValidRGB(rgb: RGB_OBJECT): RGB_OBJECT {
    return {
        red: getValidValue(rgb.red),
        blue: getValidValue(rgb.blue),
        green: getValidValue(rgb.green),
        alpha: getValidAlpha(rgb.alpha),
    };
}
