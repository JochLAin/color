import Color from "./models";
import { COLOR_INPUT, HSL, RGB } from "./types";
import { createHEX, createHSL, createRGB } from "./factories";

const _isCMYK = (args: any) => isCMYK(args) || isSCMYK(args);
const _isHSL = (args: any) => isHSL(args) || isSHSL(args);
const _isHWB = (args: any) => isHWB(args) || isSHWB(args);
const _isRGB = (args: any) => isRGB(args) || isSRGB(args);

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

    isHEX,
    isINT,
    isNCOL,
    _isCMYK as isCMYK,
    _isHSL as isHSL,
    _isHWB as isHWB,
    _isRGB as isRGB,
};

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new Color(createRGB(props as RGB));
        case 'hsl': return new Color(createHSL(props as HSL));
        default: return new Color(createHEX());
    }
};
