import { ColorHSL, ColorRGB } from "./types";

export const createHex = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;

export const createHSL = ({ hue, saturation, lightness }: { hue?: number, saturation?: number, lightness?: number } = {}): ColorHSL => ({
    hue: Number(hue || Number(Math.random() * 360).toFixed(0)),
    saturation: Number(saturation || Number(Math.random() * 100).toFixed(0)),
    lightness: Number(lightness || Number(Math.random() * 100).toFixed(0)),
});

export const createRGB = ({ red, green, blue }: { red?: number, green?: number, blue?: number } = {}): ColorRGB => ({
    red: Number(red || Number(Math.random() * 0xFF).toFixed(0)),
    green: Number(green || Number(Math.random() * 0xFF).toFixed(0)),
    blue: Number(blue || Number(Math.random() * 0xFF).toFixed(0))
});
