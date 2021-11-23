import { createHEX, createHSL, createRGB } from "./factories";
import Color, { ColorHEX, ColorHSL, ColorRGB } from "./models";
import { COLOR_INPUT, HEX, HSL, RGB } from "./types";

const module = (props: COLOR_INPUT, format: string = 'rgb') => {
    return new Color(props, format);
};

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new ColorRGB(createRGB(props as RGB));
        case 'hsl': return new ColorHSL(createHSL(props as HSL));
        default: return new ColorHEX(createHEX());
    }
};

export default module;
Object.assign(module, { random });
