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
