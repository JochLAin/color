import { HEX_REGEX, HSL_REGEX, HWB_REGEX, NAMES, RGB_REGEX } from "../constants";
import { INT, HEX, RGB, sRGB, HSL, sHSL, HWB, sHWB, NCOL, sNCOL, CMYK, sCMYK } from "../types";
import { isHEX, isHSL, isHWB, isRGB, isSHSL, isSHWB, isSRGB } from "../utils";
import parseHSL, { parseArray as parseArrayHSL, parseObject as parseObjectHSL, parseString as parseStringHSL } from "./hsl";
import parseHWB, { parseArray as parseArrayHWB, parseObject as parseObjectHWB, parseString as parseStringHWB } from "./hwb";
import parseRGB, { parseArray as parseArrayRGB, parseObject as parseObjectRGB, parseString as parseStringRGB } from "./rgb";
import parseHEX from "./hex";
import parseINT from "./int";

type Input = number | string | number[] | INT | HEX | RGB | sRGB | HSL | sHSL | HWB | sHWB | CMYK | sCMYK | NCOL | sNCOL;
type Output = INT | HEX | RGB | HSL | CMYK | HWB | NCOL;

export default (props: Input, format: string = 'rgb'): [Output, string] => {
    if (typeof props === 'number') return [parseINT({ value: props }), 'number'];

    if (typeof props === 'string') {
        return ((props: string): [Output, string] => {
            if (HEX_REGEX.test(props)) return [parseHEX({ hex: props }), 'hex'];
            if (RGB_REGEX.test(props)) return [parseStringRGB(props), 'rgb'];
            if (HSL_REGEX.test(props)) return [parseStringHSL(props), 'hsl'];
            if (HWB_REGEX.test(props)) return [parseStringHWB(props), 'hwb'];
            if (props in NAMES) return [parseHEX({ hex: NAMES[props] }), 'hex'];
            throw new Error(`Unknown name or format for "${props}"`);
        })(props);
    }

    if (Array.isArray(props)) {
        return ((props): [Output, string] => {
            if (/^hsla?$/.test(format)) return [parseArrayHSL(props as [number, number, number, number?]), 'hsl'];
            if (/^hwba?$/.test(format)) return [parseArrayHWB(props as [number, number, number, number?]), 'hwb'];
            return [parseArrayRGB(props as [number, number, number, number?]), 'rgb'];
        })(props);
    }

    if (isSRGB(props)) return [parseObjectRGB(props as sRGB), 'rgb'];
    if (isSHSL(props)) return [parseObjectHSL(props as sHSL), 'hsl'];
    if (isSHWB(props)) return [parseObjectHWB(props as sHWB), 'hwb'];
    if (isRGB(props)) return [parseObjectRGB(props as RGB), 'rgb'];
    if (isHSL(props)) return [parseObjectHSL(props as HSL), 'hsl'];
    if (isHWB(props)) return [parseObjectHWB(props as HWB), 'hwb'];
    if (isHEX(props)) return [parseHEX(props as HEX), 'hex'];

    return [parseHEX({ hex: '#000000' }), 'hex'];
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
}
