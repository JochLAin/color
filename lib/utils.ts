export const getChannelRGBFromHSI = (
    idx: number,
    hue: number,
    saturation: number,
    intensity: number,
): number => {
    const k = (idx + hue / 30) % 12;
    return 0;
};

export const getChannelRGBFromHSL = (
    idx: number,
    hue: number,
    saturation: number,
    lightness: number,
): number => {
    const k = (idx + hue / 30) % 12;
    const a = saturation * Math.min(lightness, 1 - lightness);
    return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
};

export const getChannelRGBFromHSV = (
    idx: number,
    hue: number,
    saturation: number,
    brightness: number,
): number => {
    const k = (idx + hue / 60) % 6;
    return brightness - brightness * saturation * Math.max(0, Math.min(k, 4 - k, 1));
};

const EPSILON = 10 ** -10;
export const round = (param?: string|number, max: number = 100.0, modulo: boolean = false, min: number = 0.0): number => {
    if (!param) return 0;
    let value = Number(param);
    if (Number.isNaN(value)) throw new Error(`Value is not a number => ${value}`);

    if (modulo) value %= max;
    if (modulo && value < min) value += max;
    if (value > max) value = max;
    if (value < min) value = min;

    if (value > 0) {
        if ((value % 1.0) < 0.5 && !(Math.abs((value % 1.0) - 0.5) < EPSILON)) value = Math.floor(value / EPSILON) * EPSILON;
        else value = Math.ceil(value / EPSILON) * EPSILON;
    } else {
        if ((value % 1.0) < 0.5 || Math.abs((value % 1.0) - 0.5) < EPSILON) value = Math.floor(value)
        else value = Math.ceil(value / EPSILON) * EPSILON;
    }

    return value;
};
