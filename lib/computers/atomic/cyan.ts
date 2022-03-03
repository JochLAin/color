import { fromRGB as computeBlackFromRGB } from "./black";
import { fromRGB as computeBrightnessFromRGB } from "./brightness";

export const fromRGB = (
    red: number,
    blue: number,
    green: number,
    brightness: number = computeBrightnessFromRGB(red, blue, green),
    black: number = computeBlackFromRGB(red, blue, green, brightness),
): number => {
    if (brightness === 0) return 0;

    return (1.0 - red - black) / brightness;
};
