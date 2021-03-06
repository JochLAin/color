import { HEX_REGEX, HSL_REGEX, HWB_REGEX, NAMES, RGB_REGEX } from "../constants";
import { COLOR, COLOR_INPUT, HEX, RGB, sRGB, HSL, sHSL, HWB, sHWB, NCOL, sNCOL, CMYK, sCMYK } from "../types";
import { isHEX, isHSL, isHWB, isRGB, isSHSL, isSHWB, isSRGB } from "../utils";
import parseHSL, { parseArray as parseArrayHSL, parseObject as parseObjectHSL, parseString as parseStringHSL } from "./hsl";
import parseHWB, { parseArray as parseArrayHWB, parseObject as parseObjectHWB, parseString as parseStringHWB } from "./hwb";
import parseRGB, { parseArray as parseArrayRGB, parseObject as parseObjectRGB, parseString as parseStringRGB } from "./rgb";
import parseHEX from "./hex";
import parseINT from "./int";

export default (props: COLOR_INPUT, format: string = 'rgb'): [COLOR, string] => {
    if (typeof props === 'number') return [parseINT({ int: props }), 'number'];

    if (typeof props === 'string') {
        if (HEX_REGEX.test(props)) return [parseHEX({ hex: props }), 'hex'];
        if (RGB_REGEX.test(props)) return [parseStringRGB(props), 'rgb'];
        if (HSL_REGEX.test(props)) return [parseStringHSL(props), 'hsl'];
        if (HWB_REGEX.test(props)) return [parseStringHWB(props), 'hwb'];
        if (props in NAMES) return [parseHEX({ hex: NAMES[props] }), 'hex'];
        throw new Error(`Unknown name or format for "${props}"`);
    }

    if (Array.isArray(props)) {
        if (/^hsla?$/.test(format)) return [parseArrayHSL(props as [number, number, number, number?]), 'hsl'];
        if (/^hwba?$/.test(format)) return [parseArrayHWB(props as [number, number, number, number?]), 'hwb'];
        return [parseArrayRGB(props as [number, number, number, number?]), 'rgb'];
    }

    if (isSRGB(props)) return [parseObjectRGB(props), 'rgb'];
    if (isSHSL(props)) return [parseObjectHSL(props), 'hsl'];
    if (isSHWB(props)) return [parseObjectHWB(props), 'hwb'];
    if (isRGB(props)) return [parseObjectRGB(props), 'rgb'];
    if (isHSL(props)) return [parseObjectHSL(props), 'hsl'];
    if (isHWB(props)) return [parseObjectHWB(props), 'hwb'];
    if (isHEX(props)) return [parseHEX(props as HEX), 'hex'];

    throw new Error(`Unknown name or format for "${JSON.stringify(props)}"`);
};

export const parseCMYK = (props: string | [number, number, number, number] | sCMYK | CMYK): CMYK => {
    return props as CMYK;
};

export const parseNCOL = (props: string | [string, number, number] | sNCOL | NCOL): NCOL => {
    return props as NCOL;
};

export {
    parseHEX,
    parseHSL,
    parseArrayHSL,
    parseObjectHSL,
    parseStringHSL,
    parseHWB,
    parseArrayHWB,
    parseObjectHWB,
    parseStringHWB,
    parseINT,
    parseRGB,
    parseArrayRGB,
    parseObjectRGB,
    parseStringRGB,
};
