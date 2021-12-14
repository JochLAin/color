export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return 0.2627 * red + 0.678 * green + 0.0593 * blue;
};
