import { RGB } from "../types";

export const HUEtoRGB = (hue: number, tmp1: number, tmp2: number): number => {
    hue += 6; hue %= 6;
    if (hue < 1) return (tmp1 - tmp2) * hue + tmp2;
    if (hue < 3) return tmp1;
    if (hue < 4) return (tmp1 - tmp2) * (4 - hue) + tmp2;
    return tmp2;
};

export const HUEtoNCOL = (hue: number): string => {
    hue %= 360;
    if (hue < 60) return `R${Math.round(hue / 0.6)}`;
    if (hue < 120) return `Y${Math.round((hue - 60) / 0.6)}`;
    if (hue < 180) return `G${Math.round((hue - 120) / 0.6)}`;
    if (hue < 240) return `C${Math.round((hue - 180) / 0.6)}`;
    if (hue < 300) return `B${Math.round((hue - 240) / 0.6)}`;
    if (hue < 360) return `M${Math.round((hue - 300) / 0.6)}`;

    return '';
};

export const RGBtoHUE = (props: RGB, min: number, max: number): number => {
    let hue: number = ((): number => {
        if (max.toFixed(5) === min.toFixed(5)) return 0;
        switch (max) {
            case props.red: return (props.green - props.blue) / (max - min);
            case props.green: return (props.blue - props.red) / (max - min) + 2.0;
            case props.blue: return (props.red - props.green) / (max - min) + 4.0;
        }
        return 0;
    })();

    if (Number.isNaN(Number(hue))) hue = 0;
    hue *= 60;
    if (hue < 0) hue += 360;

    return hue % 360;
};

export const RGBtoWHITENESS = (props: RGB) => {
    return Math.min(props.red, props.green, props.blue) / 0xFF * 100
};

export const RGBtoDARKNESS = (props: RGB) => {
    return (0xFF - Math.max(props.red, props.green, props.blue)) / 0xFF * 100
};
