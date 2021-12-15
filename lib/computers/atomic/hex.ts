export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    alpha?: number,
): string => {
    let hex = '#';
    hex += Math.round(red).toString(16).padStart(2, '0');
    hex += Math.round(green).toString(16).padStart(2, '0');
    hex += Math.round(blue).toString(16).padStart(2, '0');
    if (alpha !== undefined && alpha !== 100) {
        hex += Math.round(alpha / 100.0 * 255.0).toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
};
