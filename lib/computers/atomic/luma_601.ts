export const fromRGB = (
    red: number,
    green: number,
    blue: number,
): number => {
    return 0.2989 * red + 0.578 * green + 0.114 * blue;
};
