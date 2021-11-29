import { RGB } from "../types";

export const HUEtoRGB = (hue: number, tmp1: number, tmp2: number): number => {
    if (hue < 0.0) hue += 6.0;
    hue %= 6.0;
    if (hue < 1.0) return (tmp1 - tmp2) * hue + tmp2;
    if (hue < 3.0) return tmp1;
    if (hue < 4.0) return (tmp1 - tmp2) * (4.0 - hue) + tmp2;
    return tmp2;
};

export const HUEtoNCOL = (hue: number): string => {
    if (hue < 0.0) hue += 360.0;
    hue %= 360.0;
    if (hue < 60.0) return `R${Math.round(hue / 0.6)}`;
    if (hue < 120.0) return `Y${Math.round((hue - 60.0) / 0.6)}`;
    if (hue < 180.0) return `G${Math.round((hue - 120.0) / 0.6)}`;
    if (hue < 240.0) return `C${Math.round((hue - 180.0) / 0.6)}`;
    if (hue < 300.0) return `B${Math.round((hue - 240.0) / 0.6)}`;
    if (hue < 360.0) return `M${Math.round((hue - 300.0) / 0.6)}`;

    return '';
};

export const RGBtoHUE = (props: RGB, min: number, max: number): number => {
    const delta = max - min;
    let hue: number = ((): number => {
        if (max.toFixed(10) === min.toFixed(10)) return 0.0;
        switch (max) {
            case props.red: return (props.green - props.blue) / delta;
            case props.green: return (props.blue - props.red) / delta + 2.0;
            case props.blue: return (props.red - props.green) / delta + 4.0;
        }
        return 0;
    })();

    if (Number.isNaN(Number(hue))) hue = 0.0;
    hue *= 60.0;
    if (hue < 0.0) hue += 360.0;

    return hue % 360.0;
};

export const RGBtoWHITENESS = (props: RGB) => {
    return Math.min(props.red, props.green, props.blue) / 255.0 * 100.0;
};

export const RGBtoDARKNESS = (props: RGB) => {
    return (255.0 - Math.max(props.red, props.green, props.blue)) / 255.0 * 100.0;
};
