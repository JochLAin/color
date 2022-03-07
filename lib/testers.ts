import { ANGLE_REGEXP, ALPHA_REGEXP, NUMBER_REGEXP, HEX_REGEXP, HSL_REGEXP_FULL, HWB_REGEXP_FULL, RGB_REGEXP_FULL } from "./constants";
import { COLOR_INPUT, HEX, HEX_ARRAY, HEX_OBJECT, HEX_SHORTCUT, HSL, HSL_ARRAY, HSL_OBJECT, HSL_SHORTCUT, HWB, HWB_ARRAY, HWB_OBJECT, HWB_SHORTCUT, RGB, RGB_ARRAY, RGB_OBJECT, RGB_SHORTCUT } from "./types";

export default (props: any): props is COLOR_INPUT => isHEX(props) || isHSL(props) || isHWB(props) || isRGB(props);

/************************************/
/*               HEX                */
/************************************/

export const isArrayHEX = (props: any): props is HEX_ARRAY => {
    return typeof props === 'object'
        && Array.isArray(props)
        && [1, 2].includes(props.length)
        && HEX_REGEXP.test(props[0])
        && (props.length !== 2 || ALPHA_REGEXP.test(props[1]))
    ;
};

export const isObjectHEX = (props: any): props is HEX_OBJECT => {
    return typeof props === 'object'
        && 'hex' in props && HEX_REGEXP.test(String(props.hex))
        && (!('alpha' in props) || ALPHA_REGEXP.test(String(props.alpha)))
    ;
};

export const isShortcutHEX = (props: any): props is HEX_SHORTCUT => {
    return typeof props === 'object'
        && 'h' in props && HEX_REGEXP.test(String(props.h))
        && (!('a' in props) || ALPHA_REGEXP.test(String(props.a)))
    ;
};

export const isStringHEX = (props: any): props is string => {
    return typeof props === 'string' && HEX_REGEXP.test(props);
}

export const isHEX = (props: any): props is HEX => {
    return isStringHEX(props)
        || isObjectHEX(props)
        || isShortcutHEX(props)
        || isArrayHEX(props);
}

/************************************/
/*               HSL                */
/************************************/

export const isArrayHSL = (props: any): props is HSL_ARRAY => {
    return typeof props === 'object'
        && Array.isArray(props)
        && [3, 4].includes(props.length)
        && ANGLE_REGEXP.test(props[0])
        && props.slice(1).every((prop) => ALPHA_REGEXP.test(prop))
    ;
};

export const isObjectHSL = (props: any): props is HSL_OBJECT => {
    return typeof props === 'object'
        && 'hue' in props && ANGLE_REGEXP.test(String(props.hue))
        && 'saturation' in props && ALPHA_REGEXP.test(String(props.saturation))
        && 'lightness' in props && ALPHA_REGEXP.test(String(props.lightness))
        && (!('alpha' in props) || ALPHA_REGEXP.test(String(props.alpha)))
    ;
};

export const isShortcutHSL = (props: any): props is HSL_SHORTCUT => {
    return typeof props === 'object'
        && 'h' in props && ANGLE_REGEXP.test(String(props.h))
        && 's' in props && ALPHA_REGEXP.test(String(props.s))
        && 'l' in props && ALPHA_REGEXP.test(String(props.l))
        && (!('a' in props) || ALPHA_REGEXP.test(String(props.a)))
    ;
};

export const isStringHSL = (props: any): props is string => {
    return typeof props === 'string' && HSL_REGEXP_FULL.test(props);
}

export const isHSL = (props: any): props is HSL => {
    return isStringHSL(props)
        || isObjectHSL(props)
        || isShortcutHSL(props)
        || isArrayHSL(props);
}

/************************************/
/*               HWB                */
/************************************/

export const isArrayHWB = (props: any): props is HWB_ARRAY => {
    return typeof props === 'object'
        && Array.isArray(props)
        && [3, 4].includes(props.length)
        && ANGLE_REGEXP.test(props[0])
        && props.slice(1).every((prop) => ALPHA_REGEXP.test(prop))
    ;
};

export const isObjectHWB = (props: any): props is HWB_OBJECT => {
    return typeof props === 'object'
        && 'hue' in props && ANGLE_REGEXP.test(String(props.hue))
        && 'white' in props && ALPHA_REGEXP.test(String(props.white))
        && 'black' in props && ALPHA_REGEXP.test(String(props.black))
        && (!('alpha' in props) || ALPHA_REGEXP.test(String(props.alpha)))
    ;
};

export const isShortcutHWB = (props: any): props is HWB_SHORTCUT => {
    return typeof props === 'object'
        && 'h' in props && ANGLE_REGEXP.test(String(props.h))
        && 'w' in props && ALPHA_REGEXP.test(String(props.w))
        && 'b' in props && ALPHA_REGEXP.test(String(props.b))
        && (!('a' in props) || ALPHA_REGEXP.test(String(props.a)))
    ;
};

export const isStringHWB = (props: any): props is string => {
    return typeof props === 'string' && HWB_REGEXP_FULL.test(props);
}

export const isHWB = (props: any): props is HWB => {
    return isStringHWB(props)
        || isObjectHWB(props)
        || isShortcutHWB(props)
        || isArrayHWB(props);
}

/************************************/
/*               RGB                */
/************************************/

export const isArrayRGB = (props: any): props is RGB_ARRAY => {
    return typeof props === 'object'
        && Array.isArray(props)
        && [3, 4].includes(props.length)
        && props.slice(0, 3).every((prop) => NUMBER_REGEXP.test(prop))
        && (props.length !== 4 || props.slice(-1).every((prop) => ALPHA_REGEXP.test(prop)))
    ;
};

export const isObjectRGB = (props: any): props is RGB_OBJECT => {
    return typeof props === 'object'
        && 'red' in props && NUMBER_REGEXP.test(String(props.red))
        && 'blue' in props && NUMBER_REGEXP.test(String(props.blue))
        && 'green' in props && NUMBER_REGEXP.test(String(props.green))
        && (!('alpha' in props) || ALPHA_REGEXP.test(String(props.alpha)))
    ;
};

export const isShortcutRGB = (props: any): props is RGB_SHORTCUT => {
    return typeof props === 'object'
        && 'r' in props && NUMBER_REGEXP.test(String(props.r))
        && 'g' in props && NUMBER_REGEXP.test(String(props.g))
        && 'b' in props && NUMBER_REGEXP.test(String(props.b))
        && (!('a' in props) || ALPHA_REGEXP.test(String(props.a)))
    ;
};

export const isStringRGB = (props: any): props is string => {
    return typeof props === 'string' && RGB_REGEXP_FULL.test(props);
}

export const isRGB = (props: any): props is RGB => {
    return isStringRGB(props)
        || isObjectRGB(props)
        || isShortcutRGB(props)
        || isArrayRGB(props);
}
