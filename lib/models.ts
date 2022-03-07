import { computeCMYK, computeHEX, computeHCL, computeHSI, computeHSL, computeHSV, computeHWB, computeINT, computeNCOL, computeRGB } from "./computers";
import {DARK, HEX_MAX_VALUE, LIGHT, NAMES, YIQ_THRESHOLD} from "./constants";
import parse, { parseCMYK, parseHEX, parseHSL, parseHWB, parseINT, parseNCOL, parseRGB } from "./parsers";
import { stringifyCMYK, stringifyHSL, stringifyHWB, stringifyRGB } from "./stringifiers";
import { COLOR, COLOR_INPUT, CMYK, HEX, HSL, HWB, RGB, PROPERTY_MATH } from "./types";
import { isObjectHEX, isObjectHSL, isObjectHWB, isObjectRGB } from "./testers";
import normalizeValue from "./normalizers";

const PRECISION = 10;

class ColorBase {
    props: COLOR;

    constructor(props: COLOR) {
        this.props = props;
    }
}

class ColorComputer extends ColorBase {
    computeCMYK = () => {
        this.props = { ...this.props, ...computeCMYK(this.props) };
        return this;
    };

    computeHEX = () => {
        this.props = { ...this.props, ...computeHEX(this.props) };
        return this;
    };

    computeHCL = () => {
        this.props = { ...this.props, ...computeHCL(this.props) };
        return this;
    };

    computeHSI = () => {
        this.props = { ...this.props, ...computeHSI(this.props) };
        return this;
    };

    computeHSL = () => {
        this.props = { ...this.props, ...computeHSL(this.props) };
        return this;
    };

    computeHSV = () => {
        this.props = { ...this.props, ...computeHSV(this.props) };
        return this;
    };

    computeHWB = () => {
        this.props = { ...this.props, ...computeHWB(this.props) };
        return this;
    };

    computeINT = () => {
        this.props = { ...this.props, ...computeINT(this.props) };
        return this;
    };

    computeNCOL = () => {
        this.props = { ...this.props, ...computeNCOL(this.props) };
        return this;
    };

    computeRGB = () => {
        this.props = { ...this.props, ...computeRGB(this.props) };
        return this;
    };
}

class ColorGetterSetter extends ColorComputer {
    name = (name?: string): string | Color => {
        if (name === undefined) return this.props.name;
        return new Color(parseHEX({ ...this.props, name, hex: NAMES[name] }));
    }

    int = (int?: number): number | Color => {
        if (!isINT(this.props)) this.computeINT();
        if (int === undefined) return this.props.int;
        return new Color(parseINT({ ...this.props, int }));
    }

    hex = (hex?: string): string | Color => {
        if (!isObjectHEX(this.props)) this.computeHEX();
        if (hex === undefined) return this.props.hex;
        return new Color(parseHEX({ ...this.props, hex }));
    }

    red = (red?: number): number | Color => {
        if (!isObjectRGB(this.props)) this.computeRGB();
        if (red === undefined) return this.props.red;
        return new Color(parseRGB({ ...this.props, red }));
    }

    green = (green?: number): number | Color => {
        if (!isObjectRGB(this.props)) this.computeRGB();
        if (green === undefined) return this.props.green;
        return new Color(parseRGB({ ...this.props, green } as RGB));
    }

    blue = (blue?: number): number | Color => {
        if (!isObjectRGB(this.props)) this.computeRGB();
        if (blue === undefined) return this.props.blue;
        return new Color(parseRGB({ ...this.props, blue } as RGB));
    }

    hue = (hue?: number): number | Color => {
        if (!isObjectHSL(this.props) && !isObjectHWB(this.props)) this.computeHSL();
        if (hue === undefined) return this.props.hue;
        if (isObjectHWB(this.props)) return new Color(parseHWB({ ...this.props, hue } as HWB));
        return new Color(parseHSL({ ...this.props, hue } as HSL));
    }

    ncol = (ncol?: string): string | Color => {
        if (!isNCOL(this.props)) this.computeNCOL();
        if (ncol === undefined) return this.props.ncol as string;
        return new Color(parseNCOL({ ...this.props, ncol } as NCOL));
    }

    cyan = (cyan?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (cyan === undefined) return this.props.cyan;
        return new Color(parseCMYK({ ...this.props, cyan } as CMYK));
    }

    magenta = (magenta?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (magenta === undefined) return this.props.magenta;
        return new Color(parseCMYK({ ...this.props, magenta } as CMYK));
    }

    yellow = (yellow?: number): number | Color => {
        if (!isCMYK(this.props)) this.computeCMYK();
        if (yellow === undefined) return this.props.yellow;
        return new Color(parseCMYK({ ...this.props, yellow } as CMYK));
    }

    white = (white?: number): number | Color => {
        if (!isObjectHWB(this.props) && !isNCOL(this.props)) this.computeHWB();
        if (white === undefined) return this.props.white;
        if (isNCOL(this.props)) return new Color(parseNCOL({ ...this.props, white } as NCOL));
        return new Color(parseHWB({ ...this.props, white } as HWB));
    }

    black = (black?: number): number | Color => {
        if (!isObjectHWB(this.props) && !isNCOL(this.props)) this.computeHWB();
        if (black === undefined) return this.props.black;
        if (isNCOL(this.props)) return new Color(parseNCOL({ ...this.props, black } as NCOL));
        return new Color(parseHWB({ ...this.props, black } as HWB));
    }

    saturation = (saturation?: number): number | Color => {
        if (!isObjectHSL(this.props)) this.computeHSL();
        if (saturation === undefined) return this.props.saturation;
        if (saturation === 0) return new Color(parseHSL({ ...this.props, hue: 0.0, saturation } as HSL));
        return new Color(parseHSL({ ...this.props, saturation } as HSL));
    }

    lightness = (lightness?: number): number | Color => {
        if (!isObjectHSL(this.props)) this.computeHSL();
        if (lightness === undefined) return this.props.lightness;
        return new Color(parseHSL({ ...this.props, lightness } as HSL));
    }

    alpha = (alpha?: number): number | Color => {
        if (alpha === undefined) return this.props.alpha;
        if (isObjectHEX(this.props)) return new Color(parseHEX({ ...this.props, alpha } as HEX));
        if (isObjectRGB(this.props)) return new Color(parseRGB({ ...this.props, alpha } as RGB));
        if (isObjectHSL(this.props)) return new Color(parseHSL({ ...this.props, alpha } as HSL));
        if (isObjectHWB(this.props)) return new Color(parseHWB({ ...this.props, alpha } as HWB));

        this.computeRGB();
        return new Color(parseRGB({ ...this.props, alpha: alpha } as RGB));
    }
}

class Color {
    clone = () => new Color(this.props);
    eq = (color: COLOR_INPUT, format?: string) => this.getInteger() === ColorProxy.create(color, format).getInteger();
    hasTransparency = () => this.getAlpha() !== 100.0;
    isTransparent = () => this.getAlpha() === 0.0;
    isDark = () => this.getYiq() === DARK;
    isLight = () => this.getYiq() === LIGHT;

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
        return this.set(prop, this.get(prop) * normalizeValue(value) / 100.0);
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
        if (!(color instanceof Color)) color = Color.create(color);
        weight = normalizeValue(weight) / 100.0;
        const red = this.red();
        const green = this.green();
        const blue = this.blue();

        const _red = color.red();
        const _green = color.green();
        const _blue = color.blue();

        return this.rgb({
            red: Math.min(red, _red) + Math.abs(red - _red) * (red <= _red ? weight : (1 - weight)),
            green: Math.min(green, _green) + Math.abs(green - _green) * (green <= _green ? weight : (1 - weight)),
            blue: Math.min(blue, _blue) + Math.abs(blue - _blue) * (blue <= _blue ? weight : (1 - weight)),
        });
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
            if (!isObjectHSL(this.props)) this.computeHSL();
            return stringifyHSL(this.props as HSL);
        }
        return new ColorHSL(parseHSL(value));
    }

    hwb = (value?: string | [number, number, number] | HWB): string | Color => {
        if (value === undefined) {
            if (!isObjectHWB(this.props)) this.computeHWB();
            return stringifyHWB(this.props as HWB);
        }
        return new ColorHWB(parseHWB(value));
    }

    rgb = (value?: string | [number, number, number] | RGB): string | Color => {
        if (value === undefined) {
            if (!isObjectRGB(this.props)) this.computeRGB();
            return stringifyRGB(this.props as RGB);
        }
        return new ColorRGB(parseRGB(value));
    }

    get yiq() {
        if (!isObjectRGB(this.props)) this.computeRGB();
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
            if (!isObjectRGB(this.props)) this.computeRGB();
            return { ...this.props } as RGB;
        }
        if (format === 'hsl') {
            if (!isObjectHSL(this.props)) this.computeHSL();
            return { ...this.props } as HSL;
        }
        if (format === 'hwb') {
            if (!isObjectHWB(this.props)) this.computeHWB();
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
        if (!isObjectHEX(this.props)) this.computeHEX();
        if (!isObjectRGB(this.props)) this.computeRGB();
        if (!isObjectHSL(this.props)) this.computeHSL();
        if (!isObjectHWB(this.props)) this.computeHWB();
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
