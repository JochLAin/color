import { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES } from "./constants";
import { getValidAlpha, getValidHSL, getValidHWB, getValidRGB } from "./validators";
import { INT, HEX, RGB, sRGB, HSL, sHSL, HWB, sHWB, NCOL, sNCOL, CMYK, sCMYK } from "./types";
import { isSCMYK, isCMYK, isHEX, isSHSL, isHSL, isSHWB, isHWB, isINT, isNCOL, isSRGB, isRGB } from "./utils";

type ColorInput = number | string | (number|string)[] | INT | HEX | RGB | sRGB | HSL | sHSL | HWB | sHWB | CMYK | sCMYK | NCOL | sNCOL;
type ColorOutput = INT | HEX | RGB | HSL | CMYK | HWB | NCOL;

export default (props: ColorInput, format: string = 'rgb'): [ColorOutput, string] => {
    if (typeof props === 'number') return [parseINT({ value: props }), 'number'];

    if (typeof props === 'string') {
        return ((props: string): [ColorOutput, string] => {
            if (HEX_REGEX.test(props)) return [parseHEX({ hex: props }), 'hex'];
            if (RGB_REGEX.test(props)) return [parseRGBString(props), 'rgb'];
            if (HSL_REGEX.test(props)) return [parseHSLString(props), 'hsl'];
            if (HWB_REGEX.test(props)) return [parseHWBString(props), 'hwb'];
            if (props in NAMES) return [parseName(props), 'hex'];
            throw new Error(`Unknown name or format for "${props}"`);
        })(props);
    }

    if (Array.isArray(props)) {
        return ((props): [ColorOutput, string] => {
            if (/^hsla?$/.test(format)) return [parseHSLArray(props as [number, number, number, number?]), 'hsl'];
            if (/^hwba?$/.test(format)) return [parseHWBArray(props as [number, number, number, number?]), 'hwb'];
            return [parseRGBArray(props as [number, number, number, number?]), 'rgb'];
        })(props);
    }

    if (isSRGB(props)) return [parseRGBShortcut(props as sRGB), 'rgb'];
    if (isSHSL(props)) return [parseHSLShortcut(props as sHSL), 'hsl'];
    if (isSHWB(props)) return [parseHWBShortcut(props as sHWB), 'hwb'];

    if (isRGB(props)) return [getValidRGB(props as RGB), 'rgb'];
    if (isHSL(props)) return [getValidHSL(props as HSL), 'hsl'];
    if (isHWB(props)) return [getValidHWB(props as HWB), 'hwb'];

    return [parseHEX({ hex: '#000000' }), 'hex'];
};

export const parseINT = (props: INT): INT => {
    return { value: props.value & 0xFFFFFF };
};

export const parseHEX = (props: HEX): HEX => {
    const match = props.hex.match(HEX_REGEX);
    if (!match) throw new Error(`HEX string must match with ${HEX_REGEX.toString()}`);
    if ([3, 4].includes(match[1].length)) {
        props.hex = `#${match[1].split('').map((c) => `${c}${c}`).join('')}`;
    }

    if (!/^#[\dA-Fa-f]{8}$/.test(props.hex)) {
        const alpha = getValidAlpha(Math.round(parseInt(props.hex.substr(7, 2), 16) / 0xFF * 100));
        let { hex } = props;
        if (alpha === 100) hex = hex.slice(0, -2);
        return { hex: hex.toUpperCase(), alpha };
    }
    return { hex: props.hex.toUpperCase() };
};

const parseName = (props: string): HEX => {
    if (props in NAMES) throw new Error(`Unknown name for "${props}"`);
    return { ...parseHEX({ hex: NAMES[props] }), name: props };
};

export const parseCMYK = (props: string | [number, number, number, number] | sCMYK | CMYK): CMYK => {
    return props as CMYK;
};

export const parseRGB = (props: string | [number, number, number, number?] | RGB | sRGB): RGB => {
    if (typeof props === 'object' && isRGB(props)) return getValidRGB(props as RGB);
    if (typeof props === 'object' && isSRGB(props)) return parseRGBShortcut(props as sRGB);
    if (typeof props === 'string' && RGB_REGEX.test(props)) return parseRGBString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseRGBArray(props);
    throw new Error(`Unknown RGB format for ${props}`);
};

const parseRGBString = (props: string): RGB => {
    const match = props.match(RGB_REGEX);
    if (!match) throw new Error(`RGB string must match with ${RGB_REGEX.toString()}`);

    return getValidRGB({
        red: Number(match[1]),
        green: Number(match[2]),
        blue: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};

const parseRGBArray = (props: [number, number, number, number?]): RGB => {
    const [red, green, blue, alpha] = props;
    return getValidRGB({ red, green, blue, alpha });
};

const parseRGBShortcut = (props: sRGB): RGB => {
    const { r: red, g: green, b: blue, a: alpha } = props;
    return getValidRGB({ red, green, blue, alpha });
};

export const parseHSL = (props: string | [number, number, number, number?] | HSL | sHSL): HSL => {
    if (typeof props === 'object' && isHSL(props)) return getValidHSL(props as HSL);
    if (typeof props === 'object' && isSHSL(props)) return parseHSLShortcut(props as sHSL);
    if (typeof props === 'string' && HSL_REGEX.test(props)) return parseHSLString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseHSLArray(props);
    throw new Error(`Unknown HSL format for ${props}`);
};

const parseHSLString = (props: string): HSL => {
    const match = props.match(HSL_REGEX);
    if (!match) throw new Error(`HSL string must match with ${HSL_REGEX.toString()}`);

    return getValidHSL({
        hue: Number(match[1]),
        saturation: Number(match[2]),
        lightness: Number(match[3]),
        alpha: Number(match[5] || 100)
    });
};

const parseHSLArray = (props: [number, number, number, number?]): HSL => {
    const [hue, saturation, lightness, alpha] = props;
    return getValidHSL({ hue, saturation, lightness, alpha });
};

const parseHSLShortcut = (props: sHSL): HSL => {
    const { h: hue, s: saturation, l: lightness, a: alpha } = props;
    return getValidHSL({ hue, saturation, lightness, alpha });
};

export const parseHWB = (props: string | [number, number, number, number?] | HWB | sHWB): HWB => {
    if (typeof props === 'object' && isHWB(props)) return getValidHWB(props as HWB);
    if (typeof props === 'object' && isSHWB(props)) return parseHWBShortcut(props as sHWB);
    if (typeof props === 'string' && HWB_REGEX.test(props)) return parseHWBString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseHWBArray(props);
    throw new Error(`Unknown HWB format for ${props}`);
};

const parseHWBString = (props: string): HWB => {
    const match = props.match(HWB_REGEX);
    if (!match) throw new Error(`HWB string must match with ${HWB_REGEX.toString()}`);

    return getValidHWB({
        hue: Number(match[1]),
        whiteness: Number(match[2]),
        blackness: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};

const parseHWBArray = (props: [number, number, number, number?]): HWB => {
    const [hue, whiteness, blackness, alpha] = props;
    return getValidHWB({ hue, whiteness, blackness, alpha });
};

const parseHWBShortcut = (props: sHWB): HWB => {
    const { h: hue, w: whiteness, b: blackness, a: alpha } = props;
    return getValidHWB({ hue, whiteness, blackness, alpha });
};

export const parseNCOL = (props: string | [string, number, number] | sNCOL | NCOL): NCOL => {
    return props as NCOL;
};
