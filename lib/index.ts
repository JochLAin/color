import { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES } from "./constants";
import { createHEX, createHSL, createRGB } from "./factories";
import Color from "./models";
import { COLOR_INPUT, HSL, RGB } from "./types";

export { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES };

export const paint = (props: COLOR_INPUT, format: string = 'rgb') => {
    return Color.create(props, format);
};

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new Color(createRGB(props as RGB));
        case 'hsl': return new Color(createHSL(props as HSL));
        default: return new Color(createHEX());
    }
};

Object.assign(paint, { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES, random });

export default paint;
