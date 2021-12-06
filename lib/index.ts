import { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES } from "./constants";
import { createHEX, createHSL, createRGB } from "./factories";
import Color from "./models";
import { COLOR_INPUT, HSL, RGB } from "./types";
import { isSCMYK, isCMYK, isHEX, isSHSL, isHSL, isSHWB, isHWB, isINT, isNCOL, isSRGB, isRGB } from "./utils";

export { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES };

export const paint = (props: COLOR_INPUT, format: string = 'rgb') => {
    return Color.create(props, format);
};

Object.assign(paint, {
    HEX_REGEX,
    HSL_REGEX,
    HWB_REGEX,
    RGB_REGEX,
    NAMES
});

Object.assign(paint, {
    isHEX,
    isINT,
    isNCOL,
    isCMYK: (args: any) => isCMYK(args) || isSCMYK(args),
    isHSL: (args: any) => isHSL(args) || isSHSL(args),
    isHWB: (args: any) => isHWB(args) || isSHWB(args),
    isRGB: (args: any) => isRGB(args) || isSRGB(args),
});

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new Color(createRGB(props as RGB));
        case 'hsl': return new Color(createHSL(props as HSL));
        default: return new Color(createHEX());
    }
};

Object.assign(paint, { random });

export default paint;
