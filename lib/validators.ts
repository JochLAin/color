const getValidValue = (param?: string|number, max: number = 1.0, modulo: boolean = false, min: number = 0.0): number => {
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

export default getValidValue;

export const getValidAlpha = (alpha?: number): number => {
    return getValidValue(alpha === undefined ? 1.0 : alpha);
}
