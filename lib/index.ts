import { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES, HEX_NAMES } from "./constants";
import Color from "./models";
import { createHEX, createHSL, createRGB } from "./factories";
import { COLOR_INPUT, HSL, RGB } from "./types";
import isColor, { isHEX, isHSL, isHWB, isRGB } from "./testers";

export default Color.create;

export {
    Color,

    createHEX,
    createHSL,
    createRGB,

    HEX_REGEX,
    HSL_REGEX,
    HWB_REGEX,
    RGB_REGEX,

    NAMES,
    HEX_NAMES,

    isColor,
    isHEX,
    isHSL,
    isHWB,
    isRGB,
};

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new Color(createRGB(props as RGB));
        case 'hsl': return new Color(createHSL(props as HSL));
        default: return new Color(createHEX());
    }
};
