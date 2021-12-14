import { fromRGB as computeChromaFromRGB } from "./chroma";
import { fromRGB as computeBrightnessFromRGB } from "./brightness";
import { fromRGB as computeWhiteFromRGB } from "./white";

export const fromRGB = (
    red: number,
    green: number,
    blue: number,
    white: number = computeWhiteFromRGB(red, green, blue),
    brightness: number = computeBrightnessFromRGB(red, green, blue),
    chroma: number = computeChromaFromRGB(red, green, blue, white, brightness)
): number => {
    let hue: number = ((): number => {
        if (brightness.toFixed(10) === white.toFixed(10)) return 0.0;
        switch (brightness) {
            case red: return (green - blue) / chroma;
            case green: return (blue - red) / chroma + 2.0;
            case blue: return (red - green) / chroma + 4.0;
        }
        return 0;
    })();

    if (Number.isNaN(Number(hue))) hue = 0.0;
    hue *= 60.0;
    if (hue < 0.0) hue += 360.0;

    return hue % 360.0;
};
