export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return 0.2126 * red + 0.7152 * green + 0.0772 * blue;
};
