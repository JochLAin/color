import { CMYK, HWB, HSL, RGB } from "./types";

export default function getValidValue(param?: string|number, max: number = 1.0, modulo: boolean = false, min: number = 0.0): number {
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

    const P = 1e-10;
    if ((value % 1.0) - 0.5 > -(1 / P)) return Math.ceil(value * P) / P;
    else if ((value % 1.0) - 0.5 > P) return Math.floor(value * P) / P;
    return Math.round(value * P) / P;
};

export function getValidAlpha(alpha?: number): number {
    return getValidValue(alpha === undefined ? 1.0 : alpha);
}

export function getValidCMYK(cmyk: CMYK): CMYK {
    return {
        cyan: getValidValue(cmyk.cyan),
        magenta: getValidValue(cmyk.magenta),
        yellow: getValidValue(cmyk.yellow),
        black: getValidValue(cmyk.black),
    };
}

export function getValidHWB(hwb: HWB): HWB {
    return {
        hue: getValidValue(hwb.hue),
        white: getValidValue(hwb.white),
        black: getValidValue(hwb.black),
    };
}

export function getValidHSL(hsl: HSL): HSL {
    return {
        hue: getValidValue(hsl.hue),
        saturation_hsl: getValidValue(hsl.saturation_hsl),
        lightness: getValidValue(hsl.lightness),
    };
}

export function getValidRGB(rgb: RGB): RGB {
    return {
        red: getValidValue(rgb.red),
        blue: getValidValue(rgb.blue),
        green: getValidValue(rgb.green),
    };
}
