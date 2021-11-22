import { HEX_REGEX, HSL_REGEX, HWB_REGEX, RGB_REGEX, NAMES } from "./constants";
import { getValidValue } from "./helper";
import { Color, CMYK, RGB, HSL, HWB } from "./types";
import compute from "./computer";

export default (props: Color, format: string = 'rgb'): Color => {
    if (typeof props === 'number') return parseNumber(props);
    if (typeof props === 'string') return parseString(props);
    if (Array.isArray(props)) return parseArray(props, format);

    // const red = props.red;
    // const green = props.green;
    // const blue = props.blue;
    // const hue = props.hue;
    // const saturation = props.saturation;
    // const lightness = props.lightness;
    // const whiteness = props.whiteness;
    // const blackness = props.blackness;

    if (props.red && props.green && props.blue) return compute(parseRGB(props));
    if (props.hue && props.saturation && props.lightness) return compute(parseHSL(props));
    if (props.hue && props.whiteness && props.blackness) return compute(parseHWB(props));

    return compute({ red: 0, blue: 0, green: 0 });
};

export const parseNumber = (props: number): Color => {
    return compute(parseValue(props));
};

export const parseString = (props: string): Color => {
    if (RGB_REGEX.test(props)) {
        return compute(parseRGB(props));
    }
    if (HSL_REGEX.test(props)) {
        return compute(parseHSL(props));
    }
    if (HWB_REGEX.test(props)) {
        return compute(parseHWB(props));
    }
    if (HEX_REGEX.test(props)) {
        const match = props.match(HEX_REGEX);
        if (match && [3, 4].includes(match[1].length)) {
            props = `#${match[1].split('').map((c) => `${c}${c}`).join('')}`;
        }
        return compute(parseHEX(props));
    }
    if (props in NAMES) {
        return compute(parseName(props));
    }
    throw new Error(`Unknown name or format for "${props}"`);
};

export const parseArray = (props: number[], format: string = 'rgb'): Color => {
    if (/^hsla?$/.test(format)) {
        return compute(parseHSL(props));
    }
    if (/^hwba?$/.test(format)) {
        return compute(parseHWB(props));
    }
    return compute(parseRGB(props));
};

export const parseHEX = (props: string): { hex: string, alpha?: number } => {
    if (!/^#[\dA-Fa-f]{8}$/.test(props)) {
        const alpha = getValidValue(Math.round(parseInt(props.substr(7, 2), 16) / 0xFF * 100), 0, 100);
        if (alpha === 100) props = props.slice(0, -2);
        else return { hex: props.toUpperCase(), alpha };
    }
    return { hex: props.toUpperCase() };
};

export const parseHSL = (props: any): HSL => {
    const type = typeof props;
    if (type === 'string') {
        if (!HSL_REGEX.test(props)) throw new Error(`HSL string must match with ${HSL_REGEX.toString()}`);
        const match = props.match(HSL_REGEX);
        if (!match) throw new Error(`HSL string must match with ${HSL_REGEX.toString()}`);
        return {
            hue: Number(match[1]),
            saturation: Number(match[2]),
            lightness: Number(match[3]),
            alpha: Number(match[5])
        };
    }
    if (Array.isArray(props)) {
        const [hue, saturation, lightness, alpha] = props;
        return { hue, saturation, lightness, alpha };
    }

    if (type === 'object'
    && ('hue' in props || 'h' in props)
    && ('saturation' in props || 's' in props)
    && ('lightness' in props || 'l' in props)
    ) {
        return {
            hue: props.hue || props.h,
            saturation: props.saturation || props.s,
            lightness: props.lightness || props.l,
            alpha: props.alpha || props.a,
        };
    }
    throw new Error(`Value of type ${type} is not supported`);
};

export const parseHWB = (props) => {
    const type = typeof props;
    if (type === 'string') {
        if (!HWB_REGEX.test(props)) {
            throw new Error(`HWB string must match with ${HWB_REGEX.toString()}`);
        }
        const match = props.match(HWB_REGEX);
        return {
            hue: getValidValue(match[1], 0, 360, true),
            whiteness: getValidValue(match[2], 0, 100),
            blackness: getValidValue(match[3], 0, 100),
            alpha: getValidValue(match[5], 0, 100),
        };
    }
    if (Array.isArray(props)) {
        const [hue, whiteness, blackness, alpha] = props;
        return {
            hue: getValidValue(hue, 0, 360, true),
            whiteness: getValidValue(whiteness, 0, 100),
            blackness: getValidValue(blackness, 0, 100),
            alpha: getValidValue(alpha, 0, 100),
        };
    }
    if (type === 'object'
    && ('hue' in props || 'h' in props)
    && ('whiteness' in props || 'w' in props)
    && ('blackness' in props || 'b' in props)
    ) {
        return {
            hue: getValidValue(props.hue || props.h, 0, 360, true),
            whiteness: getValidValue(props.whiteness || props.w, 0, 100),
            blackness: getValidValue(props.blackness || props.b, 0, 100),
            alpha: getValidValue(props.alpha || props.a, 0, 100),
        };
    }
    throw new Error(`Value of type ${type} is not supported`);
};

export const parseRGB = (props) => {
    const type = typeof props;
    if (type === 'number') {
        return parseValue(props);
    }
    if (type === 'string') {
        if (!RGB_REGEX.test(props)) {
            throw new Error(`RGB string must match with ${RGB_REGEX.toString()}`);
        }
        const match = props.match(RGB_REGEX);
        return {
            red: getValidValue(match[1], 0, 0xFF),
            green: getValidValue(match[2], 0, 0xFF),
            blue: getValidValue(match[3], 0, 0xFF),
            alpha: getValidValue(match[5], 0, 100)
        };
    }
    if (Array.isArray(props)) {
        const [red, green, blue, alpha] = props;
        return {
            red: getValidValue(red, 0, 0xFF),
            green: getValidValue(green, 0, 0xFF),
            blue: getValidValue(blue, 0, 0xFF),
            alpha: getValidValue(alpha, 0, 100)
        };
    }
    if (type === 'object'
    && ('red' in props || 'r' in props)
    && ('green' in props || 'g' in props)
    && ('blue' in props || 'b' in props)
    ) {
        return {
            red: getValidValue(props.red || props.r, 0, 0xFF),
            green: getValidValue(props.green || props.g, 0, 0xFF),
            blue: getValidValue(props.blue || props.b, 0, 0xFF),
            alpha: getValidValue(props.alpha || props.a, 0, 100),
        };
    }
    throw new Error(`Value of type ${type} is not supported`);
};

export const parseName = (props) => {
    return Object.assign({ name: props }, parseHEX(NAMES[props]));
};

export const parseValue = (props) => {
    return {
        value: getValidValue(props & 0xFFFFFF, 0, 0xFFFFFF)
    };
};
