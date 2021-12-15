export const fromRGB = (
    red: number,
    green: number,
    blue: number,
) => {
    return (2 * red - green - blue) / 2;
};
