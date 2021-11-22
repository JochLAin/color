import { HEX_REGEX } from "./constants";
import { getValidValue } from "./helper";
import { CMYK, HSL, HWB, RGB } from "./types";

export const CMYKtoRGB = (cyan: number, magenta: number, yellow: number, black: number): RGB => {
    cyan /= 100; magenta /= 100; yellow /= 100; black /= 100;

    return {
        red: getValidValue(0xFF - ((Math.min(1, cyan * (1 - black) + black)) * 0xFF), 0, 0xFF),
        green: getValidValue(0xFF - ((Math.min(1, magenta * (1 - black) + black)) * 0xFF), 0, 0xFF),
        blue: getValidValue(0xFF - ((Math.min(1, yellow * (1 - black) + black)) * 0xFF), 0, 0xFF),
    };
};

export const HEXtoRGB = (hex: string): RGB => {
    const match = hex.match(HEX_REGEX);
    if (!match) return { red: 0, green: 0, blue: 0 };
    return {
        red: getValidValue(parseInt(match[1].substr(0, 2), 16), 0, 0xFF),
        green: getValidValue(parseInt(match[1].substr(2, 2), 16), 0, 0xFF),
        blue: getValidValue(parseInt(match[1].substr(4, 2), 16), 0, 0xFF),
    };
};

export const HEXtoINT = (hex: string): number => {
    return getValidValue(parseInt(hex.substr(1), 16), 0, 0xFFFFFF);
};

export const HSLtoRGB = (hue: number, saturation: number, lightness: number): RGB => {
    hue /= 60; saturation /= 100; lightness /= 100;
    if (saturation === 0) {
        const value = lightness * 0xFF;
        return { red: value, green: value, blue: value };
    }
    if (lightness === 0) return { red: 0, green: 0, blue: 0 };
    if (lightness === 1) return { red: 0xFF, green: 0xFF, blue: 0xFF };

    const tmp1 = lightness <= 0.5 ? (lightness * (1 + saturation)) : (lightness + saturation - lightness * saturation);
    const tmp2 = 2 * lightness - tmp1;
    return {
        red: getValidValue(HUEtoRGB(hue + 2, tmp1, tmp2) * 0xFF, 0, 0xFF),
        green: getValidValue(HUEtoRGB(hue, tmp1, tmp2) * 0xFF, 0, 0xFF),
        blue: getValidValue(HUEtoRGB(hue - 2, tmp1, tmp2) * 0xFF, 0, 0xFF),
    };
};

export const HUEtoNCOL = (hue: number): string => {
    hue %= 360;
    if (hue < 60) return `R${(hue / 0.6)}`;
    if (hue < 120) return `Y${((hue - 60) / 0.6)}`;
    if (hue < 180) return `G${((hue - 120) / 0.6)}`;
    if (hue < 240) return `C${((hue - 180) / 0.6)}`;
    if (hue < 300) return `B${((hue - 240) / 0.6)}`;
    if (hue < 360) return `M${((hue - 300) / 0.6)}`;

    return '';
};

export const HUEtoRGB = (hue: number, tmp1: number, tmp2: number): number => {
    hue += 6; hue %= 6;
    if (hue < 1) return (tmp1 - tmp2) * hue + tmp2;
    if (hue < 3) return tmp1;
    if (hue < 4) return (tmp1 - tmp2) * (4 - hue) + tmp2;
    return tmp2;
};

export const HWBtoRGB = (hue: number, whiteness: number, blackness: number): RGB => {
    whiteness /= 100; blackness /= 100;
    const total = whiteness + blackness;
    if (total > 1) {
        whiteness /= total;
        blackness /= total;
    }
    const { red, green, blue } = HSLtoRGB(hue, 1, 0.5);
    const values = [red / 0xFF, green / 0xFF, blue / 0xFF];
    for (let idx = 0; idx < 3; idx++) {
        values[idx] *= (1 - whiteness - blackness);
        values[idx] += whiteness;
    }
    return {
        red: getValidValue(values[0] * 0xFF, 0, 0xFF),
        green: getValidValue(values[1] * 0xFF, 0, 0xFF),
        blue: getValidValue(values[2] * 0xFF, 0, 0xFF),
    };
};

export const INTtoHEX = (value: number, alpha: number): string => {
    let hex = '#';
    hex += value.toString(16).padStart(6, '0');
    if (![100, undefined].includes(alpha)) {
        hex += Math.round(alpha / 100 * 0xFF).toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
};

export const INTtoRGB = (value: number): RGB => {
    return {
        red: getValidValue((value >> 16) & 0xFF, 0, 0xFF),
        green: getValidValue((value >> 8) & 0xFF, 0, 0xFF),
        blue: getValidValue(value & 0xFF, 0, 0xFF),
    };
};

export const NCOLtoRGB = (nCol: number|string, whiteness: number, blackness: number): RGB => {
    if (!Number.isNaN(Number(String(nCol).substr(0, 1)))) {
        return HWBtoRGB(Number(nCol), whiteness, blackness);
    }
    const letter = String(nCol).substr(0, 1).toUpperCase();
    const percent = Number(String(nCol).substr(1) || 0);

    if (Number.isNaN(Number(percent))) return { red: 0, green: 0, blue: 0 };

    let hue = 0;
    if (letter === 'R') hue = percent * 0.6;
    if (letter === 'Y') hue = 60 + percent * 0.6;
    if (letter === 'G') hue = 120 + percent * 0.6;
    if (letter === 'C') hue = 180 + percent * 0.6;
    if (letter === 'B') hue = 240 + percent * 0.6;
    if (letter === 'M') hue = 300 + percent * 0.6;
    if (letter === 'W') {
        hue = 0;
        whiteness = 1 - (percent / 100);
        blackness = percent / 100;
    }

    return HWBtoRGB(hue, whiteness, blackness);
};

export const RGBtoCMYK = (red: number, green: number, blue: number): CMYK => {
    red /= 0xFF; green /= 0xFF; blue /= 0xFF;
    const max = Math.max(red, green, blue);
    if (max === 0) return { cyan: 0, magenta: 0, yellow: 0, black: 100 };
    const black = 1.0 - max;
    return {
        cyan: getValidValue((1.0 - red - black) / max * 100),
        magenta: getValidValue((1.0 - green - black) / max * 100),
        yellow: getValidValue((1.0 - blue - black) / max * 100),
        black: getValidValue(black * 100),
    };
};

export const RGBtoHEX = (red: number, green: number, blue: number, alpha: number): string => {
    let hex = '#';
    hex += Math.round(red).toString(16).padStart(2, '0');
    hex += Math.round(green).toString(16).padStart(2, '0');
    hex += Math.round(blue).toString(16).padStart(2, '0');
    if (![100, undefined].includes(alpha)) {
        hex += Math.round(alpha / 100 * 0xFF).toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
};

export const RGBtoHSL = (red: number, green: number, blue: number, hue?: number): HSL => {
    red /= 0xFF; green /= 0xFF; blue /= 0xFF;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2.0;
    if (min === max) return { hue: 0, saturation: 0, lightness: getValidValue(lightness * 100, 0, 100) };
    let saturation = (max - min) / (2.0 - max - min);
    if (lightness < 0.5) saturation = (max - min) / (max + min);

    return {
        hue: getValidValue(hue || RGBtoHUE(red, green, blue, min, max), 0, 360, true),
        saturation: getValidValue(saturation * 100, 0, 100),
        lightness: getValidValue(lightness * 100, 0, 100),
    };
};

export const RGBtoHUE = (red: number, green: number, blue: number, min: number, max: number): number => {
    let hue: number = ((): number => {
        if (max.toFixed(5) === min.toFixed(5)) return 0;
        switch (max) {
            case red: return (green - blue) / (max - min);
            case green: return (blue - red) / (max - min) + 2.0;
            case blue: return (red - green) / (max - min) + 4.0;
        }
        return 0;
    })();
    if (Number.isNaN(Number(hue))) hue = 0;
    hue *= 60;
    if (hue < 0) hue += 360;

    return hue % 360;
};

export const RGBtoHWB = (red: number, green: number, blue: number, hue: number): HWB => {
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    return {
        hue: getValidValue(hue || RGBtoHUE(red, green, blue, min, max), 0, 360, true),
        whiteness: getValidValue(min / 0xFF * 100, 0, 100),
        blackness: getValidValue((0xFF - max) / 0xFF * 100, 0, 100),
    };
};

export const RGBtoINT = (red: number, green: number, blue: number): number => {
    const value = (Math.round(red) << 16) + (Math.round(green) << 8) + Math.round(blue);
    return getValidValue(value, 0, 0xFFFFFF);
};
