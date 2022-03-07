import { CMYK_OBJECT, HWB_OBJECT, HSL_OBJECT, RGB_OBJECT } from "./types";

const precision = 1e-10;
export default function normalizeValue(param?: string|number, max: number = 1.0, modulo: boolean = false, min: number = 0.0): number {
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

export function normalizeAlpha(alpha: string|number|undefined): number {
    return normalizeValue(alpha === undefined ? 1.0 : alpha);
}

export function normalizeCMYK(cmyk: CMYK_OBJECT): CMYK_OBJECT {
    return {
        cyan: normalizeValue(cmyk.cyan),
        magenta: normalizeValue(cmyk.magenta),
        yellow: normalizeValue(cmyk.yellow),
        black: normalizeValue(cmyk.black),
        alpha: normalizeAlpha(cmyk.alpha),
    };
}

export function normalizeHWB(hwb: HWB_OBJECT): HWB_OBJECT {
    return {
        hue: normalizeValue(hwb.hue),
        white: normalizeValue(hwb.white),
        black: normalizeValue(hwb.black),
        alpha: normalizeAlpha(hwb.alpha),
    };
}

export function normalizeHSL(hsl: HSL_OBJECT): HSL_OBJECT {
    return {
        hue: normalizeValue(hsl.hue),
        saturation: normalizeValue(hsl.saturation),
        lightness: normalizeValue(hsl.lightness),
        alpha: normalizeAlpha(hsl.alpha),
    };
}

export function normalizeRGB(rgb: RGB_OBJECT): RGB_OBJECT {
    return {
        red: normalizeValue(rgb.red),
        blue: normalizeValue(rgb.blue),
        green: normalizeValue(rgb.green),
        alpha: normalizeAlpha(rgb.alpha),
    };
}
