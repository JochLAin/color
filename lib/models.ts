import { computeCMYK, computeHEX, computeHCL, computeHSI, computeHSL, computeHSV, computeHWB, computeINT, computeNCOL, computeRGB } from "./computers";
import {DARK, HEX_MAX_VALUE, LIGHT, NAMES, YIQ_THRESHOLD} from "./constants";
import parse, { parseCMYK, parseHEX, parseHSL, parseHWB, parseINT, parseNCOL, parseRGB } from "./parsers";
import { stringifyCMYK, stringifyHSL, stringifyHWB, stringifyRGB } from "./stringifiers";
import { COLOR, COLOR_INPUT, CMYK, HEX, HSL, HWB, INT, NCOL, RGB, PROPERTY_MATH } from "./types";
import { isCMYK, isHEX, isHSL, isHWB, isINT, isNCOL, isRGB } from "./utils";
import getValidValue from "./validators";

const PRECISION = 10;

class Color {
    props: COLOR;

    constructor(props: COLOR) {
        this.props = props;
    }

    computeCMYK = () => this.props = { ...this.props, ...computeCMYK(this.props as COLOR) };
    computeHEX = () => this.props = { ...this.props, ...computeHEX(this.props as COLOR) };
    computeHCL = () => this.props = { ...this.props, ...computeHCL(this.props as COLOR) };
    computeHSI = () => this.props = { ...this.props, ...computeHSI(this.props as COLOR) };
    computeHSL = () => this.props = { ...this.props, ...computeHSL(this.props as COLOR) };
    computeHSV = () => this.props = { ...this.props, ...computeHSV(this.props as COLOR) };
    computeHWB = () => this.props = { ...this.props, ...computeHWB(this.props as COLOR) };
    computeINT = () => this.props = { ...this.props, ...computeINT(this.props as COLOR) };
    computeNCOL = () => this.props = { ...this.props, ...computeNCOL(this.props as COLOR) };
    computeRGB = () => this.props = { ...this.props, ...computeRGB(this.props as COLOR) };

    clone = () => new Color(this.props as COLOR);
    eq = (color: COLOR_INPUT, format?: string) => this.int() === ColorProxy.create(color, format).int();
    hasTransparency = () => this.alpha() !== 100.0;
    isTransparent = () => this.alpha() === 0.0;
    isDark = () => this.yiq === DARK;
    isLight = () => this.yiq === LIGHT;

    get = (prop: PROPERTY_MATH): number => {
        const field = Reflect.get(this, prop);
        if (!(field instanceof Function)) return 0;
        return field() as number;
    };

    set = (prop: PROPERTY_MATH, value: number): Color => {
        const field = Reflect.get(this, prop);
        if (!(field instanceof Function)) return this;
        return field(value) as Color;
    };

    add = (prop: PROPERTY_MATH, value: number): Color => {
        return this.set(prop, this.get(prop) + value);
    }

    subtract = (prop: PROPERTY_MATH, value: number): Color => {
        return this.set(prop, this.get(prop) - value);
    }

    multiply = (prop: PROPERTY_MATH, value: number): Color => {
        return this.set(prop, this.get(prop) * value);
    }

    divide = (prop: PROPERTY_MATH, value: number): Color => {
        return this.set(prop, this.get(prop) / value);
    }

    scale = (prop: PROPERTY_MATH, value: number): Color => {
        return this.set(prop, this.get(prop) * getValidValue(value) / 100.0);
    }

    spin = (angle: number): Color => {
        return this.add('hue', angle);
    }

    complement = (): Color => {
        return this.spin(180.0);
    }

    invert = (): Color => {
        return this.set('value', this.get('value') ^ HEX_MAX_VALUE);
    }

    grayscale = (): Color => {
        return this.set('saturation', 0.0);
    }

    opacify = (value: number): Color => {
        return this.subtract('alpha', value);
    }

    transparentize = (value: number): Color => {
        return this.add('alpha', value);
    }

    darken = (value: number): Color => {
        return this.subtract('lightness', value);
    }

    lighten = (value: number): Color => {
        return this.add('lightness', value);
    }

    desaturate = (value: number): Color => {
        return this.subtract('saturation', value);
    }

    saturate(value: number): Color {
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

    name = (name?: string): string | Color => {
        if (name === undefined) return this.props.name as string;
        return new Color(parseHEX({ ...this.props, name, hex: NAMES[name] } as HEX));
    }

    int = (int?: number): number | Color => {
        if (!isINT(this.props)) this.computeINT();
        if (int === undefined) return this.props.int as number;
        return new Color(parseINT({ ...this.props, int } as INT));
    }

    hex = (hex?: string): string | Color => {
        if (!isHEX(this.props)) this.computeHEX();
        if (hex === undefined) return this.props.hex as string;
        return new Color(parseHEX({ ...this.props, hex } as HEX));
    }

    red = (red?: number): number | Color => {
        if (!isRGB(this.props)) this.computeRGB();
        if (red === undefined) return this.props.red as number;
        return new Color(parseRGB({ ...this.props, red } as RGB));
    }

    green = (green?: number): number | Color => {
        if (!isRGB(this.props)) this.computeRGB();
        if (green === undefined) return this.props.green as number;
        return new Color(parseRGB({ ...this.props, green } as RGB));
    }

    blue = (blue?: number): number | Color => {
        if (!isRGB(this.props)) this.computeRGB();
        if (blue === undefined) return this.props.blue as number;
        return new Color(parseRGB({ ...this.props, blue } as RGB));
    }

    hue = (hue?: number): number | Color => {
        if (!isHSL(this.props) && !isHWB(this.props)) this.computeHSL();
        if (hue === undefined) return this.props.hue as number;
        if (isHWB(this.props)) return new Color(parseHWB({ ...this.props, hue } as HWB));
        return new Color(parseHSL({ ...this.props, hue } as HSL));
    }

    ncol = (ncol?: string): string | Color => {
        if (!isNCOL(this.props)) this.computeNCOL();
        if (ncol === undefined) return this.props.ncol as string;
        return new Color(parseNCOL({ ...this.props, ncol } as NCOL));
    }

    cyan = (cyan?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (cyan === undefined) return this.props.cyan as number;
        return new Color(parseCMYK({ ...this.props, cyan } as CMYK));
    }

    magenta = (magenta?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (magenta === undefined) return this.props.magenta as number;
        return new Color(parseCMYK({ ...this.props, magenta } as CMYK));
    }

    yellow = (yellow?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (yellow === undefined) return this.props.yellow as number;
        return new Color(parseCMYK({ ...this.props, yellow } as CMYK));
    }

    white = (white?: number): number | Color => {
        if (!isHWB(this.props) && !isNCOL(this.props)) this.computeHWB();
        if (white === undefined) return this.props.white as number;
        if (isNCOL(this.props)) return new Color(parseNCOL({ ...this.props, white } as NCOL));
        return new Color(parseHWB({ ...this.props, white } as HWB));
    }

    black = (black?: number): number | Color => {
        if (!isHWB(this.props) && !isNCOL(this.props)) this.computeHWB();
        if (black === undefined) return this.props.black as number;
        if (isNCOL(this.props)) return new Color(parseNCOL({ ...this.props, black } as NCOL));
        return new Color(parseHWB({ ...this.props, black } as HWB));
    }

    saturation = (saturation?: number): number | Color => {
        if (!isHSL(this.props)) this.computeHSL();
        if (saturation === undefined) return this.props.saturation as number;
        if (saturation === 0) return new Color(parseHSL({ ...this.props, hue: 0.0, saturation } as HSL));
        return new Color(parseHSL({ ...this.props, saturation } as HSL));
    }

    lightness = (lightness?: number): number | Color => {
        if (!isHSL(this.props)) this.computeHSL();
        if (lightness === undefined) return this.props.lightness as number;
        return new Color(parseHSL({ ...this.props, lightness } as HSL));
    }

    alpha = (alpha?: number): number | Color => {
        if (alpha === undefined) return this.props.alpha as number;
        if (isINT(this.props)) return new Color(parseINT({ ...this.props, alpha } as INT));
        if (isHEX(this.props)) return new Color(parseHEX({ ...this.props, alpha } as HEX));
        if (isRGB(this.props)) return new Color(parseRGB({ ...this.props, alpha } as RGB));
        if (isHSL(this.props)) return new Color(parseHSL({ ...this.props, alpha } as HSL));
        if (isHWB(this.props)) return new Color(parseHWB({ ...this.props, alpha } as HWB));
        if (isNCOL(this.props)) return new Color(parseNCOL({ ...this.props, alpha } as NCOL));
        if (isCMYK(this.props)) return new Color(parseCMYK({ ...this.props, alpha } as CMYK));

        this.computeRGB();
        return new Color(parseRGB({ ...this.props, alpha: alpha } as RGB));
    }

    cmyk = (value?: string | [number, number, number, number] | CMYK): string | Color => {
        if (value === undefined) {
            if (!isCMYK(this.props)) this.computeCMYK();
            return stringifyCMYK(this.props as CMYK);
        }
        return new ColorCMYK(parseCMYK(value));
    }

    hsl = (value?: string | [number, number, number] | HSL): string | Color => {
        if (value === undefined) {
            if (!isHSL(this.props)) this.computeHSL();
            return stringifyHSL(this.props as HSL);
        }
        return new ColorHSL(parseHSL(value));
    }

    hwb = (value?: string | [number, number, number] | HWB): string | Color => {
        if (value === undefined) {
            if (!isHWB(this.props)) this.computeHWB();
            return stringifyHWB(this.props as HWB);
        }
        return new ColorHWB(parseHWB(value));
    }

    rgb = (value?: string | [number, number, number] | RGB): string | Color => {
        if (value === undefined) {
            if (!isRGB(this.props)) this.computeRGB();
            return stringifyRGB(this.props as RGB);
        }
        return new ColorRGB(parseRGB(value));
    }

    get yiq() {
        if (!isRGB(this.props)) this.computeRGB();
        const { red, green, blue } = this.props as RGB;
        const level = (((red * 299) + (green * 587) + (blue * 114)) / 1000);
        return level >= YIQ_THRESHOLD ? DARK : LIGHT;
    }

    toNumber = (): number => {
        if (!isINT(this.props)) this.computeINT();
        return this.props.value as number;
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
            if (!isRGB(this.props)) this.computeRGB();
            return { ...this.props } as RGB;
        }
        if (format === 'hsl') {
            if (!isHSL(this.props)) this.computeHSL();
            return { ...this.props } as HSL;
        }
        if (format === 'hwb') {
            if (!isHWB(this.props)) this.computeHWB();
            return { ...this.props } as HWB;
        }
        if (format === 'ncol') {
            if (!isNCOL(this.props)) this.computeNCOL();
            return { ...this.props } as NCOL;
        }
        if (format === 'cmyk') {
            if (!isCMYK(this.props)) this.computeCMYK();
            return { ...this.props } as CMYK;
        }

        if (!isINT(this.props)) this.computeINT();
        if (!isHEX(this.props)) this.computeHEX();
        if (!isRGB(this.props)) this.computeRGB();
        if (!isHSL(this.props)) this.computeHSL();
        if (!isHWB(this.props)) this.computeHWB();
        if (!isNCOL(this.props)) this.computeNCOL();
        if (!isCMYK(this.props)) this.computeCMYK();

        return { ...this.props };
    }
}

export default class ColorProxy extends Color {
    static create(props: COLOR_INPUT|Color, format?: string): ColorProxy {
        if (props instanceof Color) {
            return new ColorProxy(props.toString());
        }
        return new ColorProxy(props, format);
    }

    constructor(props: COLOR_INPUT, format?: string) {
        const [parsed] = parse(props, format);
        super(parsed);
    }
}

// type STATIC_METHODS ='get'|'set'|'add'|'subtract'|'multiply'|'divide'|'scale'|'invert'|'grayscale'|'opacify'|'transparentize'|'darken'|'lighten'|'desaturate'|'saturate'|'mix'|'hex'|'name'|'value'|'red'|'green'|'blue'|'hue'|'saturation'|'lightness'|'ncol'|'white'|'black'|'cyan'|'magenta'|'yellow'|'black'|'alpha'|'rgb'|'hsl'|'hwb'|'toNumber'|'toString'|'toJSON';
// const STATIC_KEYS: STATIC_METHODS[] = ['get','set','add','subtract','multiply','divide','scale','invert','grayscale','opacify','transparentize','darken','lighten','desaturate','saturate','mix','hex','name','value','red','green','blue','hue','saturation','lightness','ncol','white','black','cyan','magenta','yellow','black','alpha','rgb','hsl','hwb','toNumber','toString','toJSON'];
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
