export const fromRGB = (
    green: number,
    blue: number,
) => {
    return (green - blue) * Math.sqrt(3) / 2
};
