import { computeCMYK, computeHEX, computeHSL, computeHWB, computeINT, computeNCOL, computeRGB } from "./computers";
import {DARK, HEX_MAX_VALUE, LIGHT, NAMES, YIQ_THRESHOLD} from "./constants";
import parse, { parseCMYK, parseHEX, parseHSL, parseHWB, parseINT, parseNCOL, parseRGB } from "./parsers";
import { stringifyCMYK, stringifyHSL, stringifyHWB, stringifyRGB } from "./stringifiers";
import { COLOR, COLOR_TYPE, COLOR_INPUT, CMYK, HEX, HSL, HWB, INT, NCOL, RGB } from "./types";
import { isCMYK, isHEX, isHSL, isHWB, isINT, isNCOL, isRGB } from "./utils";
import getValidValue from "./validators";

type PropertyMath = 'red'|'green'|'blue'|'hue'|'saturation'|'lightness'|'whiteness'|'blackness'|'cyan'|'magenta'|'yellow'|'black'|'alpha'|'value';

const PRECISION = 10;

class ColorBase {
    #props: COLOR;

    constructor(props: COLOR_TYPE) {
        this.#props = props;
    }

    #computeCMYK = () => this.#props = { ...this.#props, ...computeCMYK(this.#props as COLOR_TYPE) };
    #computeHEX = () => this.#props = { ...this.#props, ...computeHEX(this.#props as COLOR_TYPE) };
    #computeHSL = () => this.#props = { ...this.#props, ...computeHSL(this.#props as COLOR_TYPE) };
    #computeHWB = () => this.#props = { ...this.#props, ...computeHWB(this.#props as COLOR_TYPE) };
    #computeINT = () => this.#props = { ...this.#props, ...computeINT(this.#props as COLOR_TYPE) };
    #computeNCOL = () => this.#props = { ...this.#props, ...computeNCOL(this.#props as COLOR_TYPE) };
    #computeRGB = () => this.#props = { ...this.#props, ...computeRGB(this.#props as COLOR_TYPE) };

    clone = () => new ColorBase(this.#props as COLOR_TYPE);
    eq = (color: COLOR_INPUT, format?: string) => this.value() === Color.create(color, format).value();
    hasTransparency = () => this.alpha() !== 100.0;
    isTransparent = () => this.alpha() === 0.0;
    isDark = () => this.yiq === DARK;
    isLight = () => this.yiq === LIGHT;

    get = (prop: PropertyMath): number => {
        if (!(this[prop] instanceof Function)) return 0;
        return this[prop]() as number;
    }

    set = (prop: PropertyMath, value: number): ColorBase => {
        if (!(this[prop] instanceof Function)) return this;
        return this[prop](value) as ColorBase;
    }

    add = (prop: PropertyMath, value: number): ColorBase => {
        return this.set(prop, this.get(prop) + value);
    }

    subtract = (prop: PropertyMath, value: number): ColorBase => {
        return this.set(prop, this.get(prop) - value);
    }

    multiply = (prop: PropertyMath, value: number): ColorBase => {
        return this.set(prop, this.get(prop) * value);
    }

    divide = (prop: PropertyMath, value: number): ColorBase => {
        return this.set(prop, this.get(prop) / value);
    }

    scale = (prop: PropertyMath, value: number): ColorBase => {
        return this.set(prop, this.get(prop) * getValidValue(value) / 100.0);
    }

    spin = (angle: number): ColorBase => {
        return this.add('hue', angle);
    }

    complement = (): ColorBase => {
        return this.spin(180.0);
    }

    invert = (): ColorBase => {
        return this.set('value', this.get('value') ^ HEX_MAX_VALUE);
    }

    grayscale = (): ColorBase => {
        return this.set('saturation', 0.0);
    }

    opacify = (value: number): ColorBase => {
        return this.subtract('alpha', value);
    }

    transparentize = (value: number): ColorBase => {
        return this.add('alpha', value);
    }

    darken = (value: number): ColorBase => {
        return this.subtract('lightness', value);
    }

    lighten = (value: number): ColorBase => {
        return this.add('lightness', value);
    }

    desaturate = (value: number): ColorBase => {
        return this.subtract('saturation', value);
    }

    saturate(value: number): ColorBase {
        return this.add('saturation', value);
    }

    mix = (color: COLOR_INPUT | Color, weight: number = 50.0) => {
        if (!(color instanceof Color)) color = Color.create(color as COLOR_INPUT);
        weight = getValidValue(weight) / 100.0;
        const red = this.red() as number;
        const green = this.green() as number;
        const blue = this.blue() as number;

        const _red = color.red() as number;
        const _green = color.green() as number;
        const _blue = color.blue() as number;

        return this.rgb({
            red: Math.min(red, _red) + Math.abs(red - _red) * (red <= _red ? weight : (1 - weight)),
            green: Math.min(green, _green) + Math.abs(green - _green) * (green <= _green ? weight : (1 - weight)),
            blue: Math.min(blue, _blue) + Math.abs(blue - _blue) * (blue <= _blue ? weight : (1 - weight)),
        });
    }

    hex = (hex?: string): string | ColorBase => {
        if (!isHEX(this.#props)) this.#computeHEX();
        if (hex === undefined) return this.#props.hex as string;
        return new ColorHEX({ ...this.#props, hex } as HEX);
    }

    name = (name?: string): string | ColorBase => {
        if (name === undefined) return this.#props.name as string;
        return new ColorHEX({ ...this.#props, name, hex: NAMES[name] } as HEX);
    }

    red = (red?: number): number | ColorBase => {
        if (!isRGB(this.#props)) this.#computeRGB();
        if (red === undefined) return this.#props.red as number;
        return new ColorRGB({ ...this.#props, red } as RGB);
    }

    green = (green?: number): number | ColorBase => {
        if (!isRGB(this.#props)) this.#computeRGB();
        if (green === undefined) return this.#props.green as number;
        return new ColorRGB({ ...this.#props, green } as RGB);
    }

    blue = (blue?: number): number | ColorBase => {
        if (!isRGB(this.#props)) this.#computeRGB();
        if (blue === undefined) return this.#props.blue as number;
        return new ColorRGB({ ...this.#props, blue } as RGB);
    }

    hue = (hue?: number): number | ColorBase => {
        if (!isHSL(this.#props) && !isHWB(this.#props)) this.#computeHSL();
        if (hue === undefined) return this.#props.hue as number;
        if (isHWB(this.#props)) return new ColorHWB({ ...this.#props, hue } as HWB);
        return new ColorHSL({ ...this.#props, hue } as HSL);
    }

    saturation = (saturation?: number): number | ColorBase => {
        if (!isHSL(this.#props)) this.#computeHSL();
        if (saturation === undefined) return this.#props.saturation as number;
        if (saturation === 0) return new ColorHSL({ ...this.#props, hue: 0.0, saturation } as HSL);
        return new ColorHSL({ ...this.#props, saturation } as HSL);
    }

    lightness = (lightness?: number): number | ColorBase => {
        if (!isHSL(this.#props)) this.#computeHSL();
        if (lightness === undefined) return this.#props.lightness as number;
        return new ColorHSL({ ...this.#props, lightness } as HSL);
    }

    whiteness = (whiteness?: number): number | ColorBase => {
        if (!isHWB(this.#props) && !isNCOL(this.#props)) this.#computeHWB();
        if (whiteness === undefined) return this.#props.whiteness as number;
        if (isNCOL(this.#props)) return new ColorNCOL({ ...this.#props, whiteness } as NCOL);
        return new ColorHWB({ ...this.#props, whiteness } as HWB);
    }

    blackness = (blackness?: number): number | ColorBase => {
        if (!isHWB(this.#props) && !isNCOL(this.#props)) this.#computeHWB();
        if (blackness === undefined) return this.#props.blackness as number;
        if (isNCOL(this.#props)) return new ColorNCOL({ ...this.#props, blackness } as NCOL);
        return new ColorHWB({ ...this.#props, blackness } as HWB);
    }

    cyan = (cyan?: number): number | ColorBase => {
        if (!isCMYK(this.#props)) this.#computeCMYK();
        if (cyan === undefined) return this.#props.cyan as number;
        return new ColorCMYK({ ...this.#props, cyan } as CMYK);
    }

    magenta = (magenta?: number): number | ColorBase => {
        if (!isCMYK(this.#props)) this.#computeCMYK();
        if (magenta === undefined) return this.#props.magenta as number;
        return new ColorCMYK({ ...this.#props, magenta } as CMYK);
    }

    yellow = (yellow?: number): number | ColorBase => {
        if (!isCMYK(this.#props)) this.#computeCMYK();
        if (yellow === undefined) return this.#props.yellow as number;
        return new ColorCMYK({ ...this.#props, yellow } as CMYK);
    }

    black = (black?: number): number | ColorBase => {
        if (!isCMYK(this.#props)) this.#computeCMYK();
        if (black === undefined) return this.#props.black as number;
        return new ColorCMYK({ ...this.#props, black } as CMYK);
    }

    ncol = (ncol?: string): string | ColorBase => {
        if (!isNCOL(this.#props)) this.#computeNCOL();
        if (ncol === undefined) return this.#props.ncol as string;
        return new ColorNCOL({ ...this.#props, ncol } as NCOL);
    }

    alpha = (alpha?: number): number | ColorBase => {
        if (alpha === undefined) return this.#props.alpha as number;
        if (isINT(this.#props)) return new ColorINT({ ...this.#props, alpha } as INT);
        if (isHEX(this.#props)) return new ColorHEX({ ...this.#props, alpha } as HEX);
        if (isRGB(this.#props)) return new ColorRGB({ ...this.#props, alpha } as RGB);
        if (isHSL(this.#props)) return new ColorHSL({ ...this.#props, alpha } as HSL);
        if (isHWB(this.#props)) return new ColorHWB({ ...this.#props, alpha } as HWB);
        if (isNCOL(this.#props)) return new ColorNCOL({ ...this.#props, alpha } as NCOL);
        if (isCMYK(this.#props)) return new ColorCMYK({ ...this.#props, alpha } as CMYK);

        this.#computeRGB();
        return new ColorRGB({ ...this.#props, alpha: alpha } as RGB);
    }

    value = (value?: number): number | ColorBase => {
        if (!isINT(this.#props)) this.#computeINT();
        if (value === undefined) return this.#props.value as number;
        return new ColorINT({ ...this.#props, value } as INT);
    }

    cmyk = (value?: string | CMYK): string | ColorBase => {
        if (value === undefined) {
            if (!isCMYK(this.#props)) this.#computeCMYK();
            return stringifyCMYK(this.#props as CMYK);
        }
        return new ColorCMYK(parseCMYK(value));
    }

    hsl = (value?: string | HSL): string | ColorBase => {
        if (value === undefined) {
            if (!isHSL(this.#props)) this.#computeHSL();
            return stringifyHSL(this.#props as HSL);
        }
        return new ColorHSL(parseHSL(value));
    }

    hwb = (value?: string | HWB): string | ColorBase => {
        if (value === undefined) {
            if (!isHWB(this.#props)) this.#computeHWB();
            return stringifyHWB(this.#props as HWB);
        }
        return new ColorHWB(parseHWB(value));
    }

    rgb = (value?: string | RGB): string | ColorBase => {
        if (value === undefined) {
            if (!isRGB(this.#props)) this.#computeRGB();
            return stringifyRGB(this.#props as RGB);
        }
        return new ColorRGB(parseRGB(value));
    }

    get yiq() {
        if (!isRGB(this.#props)) this.#computeRGB();
        const { red, green, blue } = this.#props as RGB;
        const level = (((red * 299) + (green * 587) + (blue * 114)) / 1000);
        return level >= YIQ_THRESHOLD ? DARK : LIGHT;
    }

    toNumber = (): number => {
        if (!isINT(this.#props)) this.#computeINT();
        return this.#props.value as number;
    }

    toString = (format?: string): string => {
        switch (format) {
            case 'rgb': return this.rgb() as string;
            case 'hsl': return this.hsl() as string;
            case 'hwb': return this.hwb() as string;
            default: return this.hex() as string;
        }
    }

    toJSON = (format?: string) => {
        if (format === 'rgb') {
            if (!isRGB(this.#props)) this.#computeRGB();
            return { ...this.#props } as RGB;
        }
        if (format === 'hsl') {
            if (!isHSL(this.#props)) this.#computeHSL();
            return { ...this.#props } as HSL;
        }
        if (format === 'hwb') {
            if (!isHWB(this.#props)) this.#computeHWB();
            return { ...this.#props } as HWB;
        }
        if (format === 'ncol') {
            if (!isNCOL(this.#props)) this.#computeNCOL();
            return { ...this.#props } as NCOL;
        }
        if (format === 'cmyk') {
            if (!isCMYK(this.#props)) this.#computeCMYK();
            return { ...this.#props } as CMYK;
        }

        if (!isINT(this.#props)) this.#computeINT();
        if (!isHEX(this.#props)) this.#computeHEX();
        if (!isRGB(this.#props)) this.#computeRGB();
        if (!isHSL(this.#props)) this.#computeHSL();
        if (!isHWB(this.#props)) this.#computeHWB();
        if (!isNCOL(this.#props)) this.#computeNCOL();
        if (!isCMYK(this.#props)) this.#computeCMYK();

        return { ...this.#props };
    }
}

class ColorINT extends ColorBase {
    constructor(props: INT) {
        super(parseINT(props));
    }
}

class ColorHEX extends ColorBase {
    constructor(props: HEX) {
        super(parseHEX(props));
    }
}

class ColorRGB extends ColorBase {
    constructor(props: RGB) {
        super(parseRGB(props));
    }
}

class ColorHSL extends ColorBase {
    constructor(props: HSL) {
        super(parseHSL(props));
    }
}

class ColorHWB extends ColorBase {
    constructor(props: HWB) {
        super(parseHWB(props));
    }
}

class ColorNCOL extends ColorBase {
    constructor(props: NCOL) {
        super(parseNCOL(props));
    }
}

class ColorCMYK extends ColorBase {
    constructor(props: CMYK) {
        super(parseCMYK(props));
    }
}

export default class Color extends ColorBase {
    static create(props: COLOR_INPUT|ColorBase, format?: string): Color {
        if (props instanceof ColorBase) {
            return new Color(props.toString());
        }
        return new Color(props, format);
    }

    constructor(props: COLOR_INPUT, format?: string) {
        const [parsed] = parse(props, format);
        super(parsed);
    }
}

// type STATIC_METHODS ='get'|'set'|'add'|'subtract'|'multiply'|'divide'|'scale'|'invert'|'grayscale'|'opacify'|'transparentize'|'darken'|'lighten'|'desaturate'|'saturate'|'mix'|'hex'|'name'|'value'|'red'|'green'|'blue'|'hue'|'saturation'|'lightness'|'ncol'|'whiteness'|'blackness'|'cyan'|'magenta'|'yellow'|'black'|'alpha'|'rgb'|'hsl'|'hwb'|'toNumber'|'toString'|'toJSON';
// const STATIC_KEYS: STATIC_METHODS[] = ['get','set','add','subtract','multiply','divide','scale','invert','grayscale','opacify','transparentize','darken','lighten','desaturate','saturate','mix','hex','name','value','red','green','blue','hue','saturation','lightness','ncol','whiteness','blackness','cyan','magenta','yellow','black','alpha','rgb','hsl','hwb','toNumber','toString','toJSON'];
//
// for (let idx = 0; idx < STATIC_KEYS.length; idx++) {
//     const key = STATIC_KEYS[idx];
//     Object.assign(Color, {
//         [key]: (props: COLOR_INPUT, ...args: any[]): any => {
//             const color = new Color(props);
//             return color[key].apply(color, args);
//         },
//     });
// }
