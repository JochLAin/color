import { HEX, HSL, RGB } from "./types";

export const createHEX = (): HEX => ({ hex: `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}` });

export const createHSL = (props?: HSL): HSL => ({
    hue: Number(props?.hue || Number(Math.random() * 360).toFixed(0)),
    saturation: Number(props?.saturation || Number(Math.random() * 100).toFixed(0)),
    lightness: Number(props?.lightness || Number(Math.random() * 100).toFixed(0)),
});

export const createRGB = (props?: RGB): RGB => ({
    red: Number(props?.red || Number(Math.random() * 0xFF).toFixed(0)),
    green: Number(props?.green || Number(Math.random() * 0xFF).toFixed(0)),
    blue: Number(props?.blue || Number(Math.random() * 0xFF).toFixed(0))
});
