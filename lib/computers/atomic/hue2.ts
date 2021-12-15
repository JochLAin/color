import { fromRGB as computeHanburyFromRGB } from "./hanbury";
import { fromRGB as computeSerraFromRGB } from "./serra";

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    hanbury: number = computeHanburyFromRGB(red, green, blue),
    serra: number = computeSerraFromRGB(green, blue),
): number => {
    return Math.atan2(serra, hanbury);
};
