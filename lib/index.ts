import Color from "./models";
import { COLOR_INPUT, HSL, RGB } from "./types";
import { createHEX, createHSL, createRGB } from "./factories";

export { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES, HEX_NAMES } from "./constants";
export { COLOR_INPUT, HSL, RGB } from "./types";
export { isSCMYK, isCMYK, isHEX, isSHSL, isHSL, isSHWB, isHWB, isINT, isNCOL, isSRGB, isRGB } from "./utils";

export default (props: COLOR_INPUT, format: string = 'rgb') => {
    return Color.create(props, format);
};

export const random = (format?: string, props?: COLOR_INPUT): Color => {
    switch (format) {
        case 'rgb': return new Color(createRGB(props as RGB));
        case 'hsl': return new Color(createHSL(props as HSL));
        default: return new Color(createHEX());
    }
};
