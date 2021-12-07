export default (hue: number): string => {
    if (hue < 0.0) hue += 360.0;
    hue %= 360.0;
    if (hue < 60.0) return `R${Math.round(hue / 0.6)}`;
    if (hue < 120.0) return `Y${Math.round((hue - 60.0) / 0.6)}`;
    if (hue < 180.0) return `G${Math.round((hue - 120.0) / 0.6)}`;
    if (hue < 240.0) return `C${Math.round((hue - 180.0) / 0.6)}`;
    if (hue < 300.0) return `B${Math.round((hue - 240.0) / 0.6)}`;
    if (hue < 360.0) return `M${Math.round((hue - 300.0) / 0.6)}`;

    return '';
};
