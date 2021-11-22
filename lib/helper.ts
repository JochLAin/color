export const getValidValue = (value?: string|number, min: number = 0, max: number = 100, modulo: boolean = false): number => {
    if (!value) return 0;

    if (typeof value === 'string' && /.*%/.test(value)) value = Number(value.slice(0, -1)) / 100 * max;
    if (typeof value === 'string' && /.*°/.test(value)) value = Number(value.slice(0, -1)) / 360 * max;
    if (typeof value === 'string' && /.*deg/.test(value)) value = Number(value.slice(0, -3)) / 360 * max;
    if (typeof value === 'string' && /.*rad/.test(value)) value = Number(value.slice(0, -3)) / (Math.PI * 2) * max;

    value = Number(value);
    if (modulo) value %= max;
    if (modulo && value < min) value += max;
    if (value > max) value = max;
    if (value < min) value = min;

    return value;
};
