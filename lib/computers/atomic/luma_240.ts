export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return 0.212 * red + 0.701 * green + 0.087 * blue;
};
