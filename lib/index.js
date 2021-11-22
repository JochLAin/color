const compute = require('./computer');
const { RGB_REGEX, HSL_REGEX, HWB_REGEX, HEX_REGEX, NAMES } = require('./constants');
const { createHex, createHSL, createRGB } = require('./factory');
const { parseRGB, parseHEX, parseHSL, parseHWB, parseName, parseValue } = require('./parser');
const { getValidValue } = require('./helper');

const SymbolState = Symbol('ColorState');

class Color {
    static create(props, format) {
        return new Color(props, format);
    }

    static random(format, predefined = {}) {
        if (format === 'rgb') return Color.create(createRGB(predefined));
        if (format === 'hsl') return Color.create(createHSL(predefined));
        return Color.create(createHex(predefined));
    }

    constructor(props, format) {
        this.mode = 'hex';
        this[SymbolState] = Object.assign({
            alpha: 100,
            red: 0,
            green: 0,
            blue: 0,
            hue: 0,
            saturation: 0,
            lightness: 0,
            white: 0,
            blackness: 100,
            hex: '#000000',
            number: 0,
        }, deserialize(props, format));

        for (const key in this[SymbolState]) {
            if (Object.hasOwnProperty.call(this[SymbolState], key)) {
                Object.defineProperty(this, key, {
                    get: () => this[SymbolState][key],
                    set: value => Reflect.set(this, `_${key}`, value),
                });
            }
        }
    }

    clone() {
        return Color.create(this);
    }

    eq(color) {
        return this[SymbolState].value === Color.create(color).value;
    }

    hasTransparency() {
        return ![undefined, 100].includes(this[SymbolState].alpha);
    }

    isDark() {
        return this.yiq === Color.dark;
    }

    isLight() {
        return this.yiq === Color.light;
    }

    isTransparent() {
        return this[SymbolState].alpha === 0;
    }

    add(property, value) {
        this[property] += value;
        return this;
    }

    subtract(property, value) {
        this[property] -= value;
        return this;
    }

    multiply(property, value) {
        this[property] *= value;
        return this;
    }

    set(property, value) {
        this[property] = value;
        return this;
    }

    scale(property, value) {
        this[property] += this[property] * getValidValue(value, 0, 100) / 100;
        return this;
    }

    // adjust(properties) {
    //     for (const key in properties) {
    //         if (properties.hasOwnProperty(key)) {
    //             this.scale(key, properties[key]);
    //         }
    //     }
    //     return this;
    // }

    // change(properties) {
    //     for (const key in properties) {
    //         if (properties.hasOwnProperty(key)) {
    //             this.set(key, properties[key]);
    //         }
    //     }
    //     return this;
    // }

    complement() {
        this.spin(180);
        return this;
    }

    spin(angle) {
        this.add('hue', angle);
        return this;
    }

    invert() {
        return this.set('value', this[SymbolState].value ^ Color.MAX_VALUE);
    }

    grayscale() {
        return this.set('saturation', 0);
    }

    opacify(value) {
        return this.add('alpha', -value);
    }

    transparentize(value) {
        return this.add('alpha', value);
    }

    lighten(value) {
        return this.add('lightness', value);
    }

    darken(value) {
        return this.add('lightness', -value);
    }

    saturate(value) {
        return this.add('saturation', value);
    }

    desaturate(value) {
        return this.add('saturation', -value);
    }

    mix(color, weight = 50) {
        color = Color.create(color);
        weight = getValidValue(weight, 0, 100) / 100;

        this.rgb = [
            Math.min(this[SymbolState].red, color.red) + Math.abs(this[SymbolState].red - color.red) * (this[SymbolState].red <= color.red ? weight : (1 - weight)),
            Math.min(this[SymbolState].green, color.green) + Math.abs(this[SymbolState].green - color.green) * (this[SymbolState].green <= color.green ? weight : (1 - weight)),
            Math.min(this[SymbolState].blue, color.blue) + Math.abs(this[SymbolState].blue - color.blue) * (this[SymbolState].blue <= color.blue ? weight : (1 - weight)),
        ];

        return this;
    }

    toJSON() {
        return Object.freeze(Object.assign({}, this[SymbolState]));
    }

    toString() {
        switch (this.mode) {
            case 'rgb': return this.rgb;
            case 'hsl': return this.hsl;
            default: return String(this[SymbolState].hex);
        }
    }

    set _alpha(_alpha) {
        if (this[SymbolState].alpha === _alpha) return;
        const alpha = getValidValue(_alpha, 0, 100);
        Object.assign(this[SymbolState], compute({
            red: this[SymbolState].red,
            green: this[SymbolState].green,
            blue: this[SymbolState].blue,
            hue: this[SymbolState].hue,
            saturation: this[SymbolState].saturation,
            lightness: this[SymbolState].lightness,
            int: this[SymbolState].int,
            alpha
        }));
    }

    set _red(_red) {
        if (this[SymbolState].red === _red) return;
        const red = getValidValue(_red, 0, 0xFF);
        Object.assign(this[SymbolState], compute({ red, green: this[SymbolState].green, blue: this[SymbolState].blue, alpha: this[SymbolState].alpha }));
    }

    set _green(_green) {
        if (this[SymbolState].green === _green) return;
        const green = getValidValue(_green, 0, 0xFF);
        Object.assign(this[SymbolState], compute({ red: this[SymbolState].red, green, blue: this[SymbolState].blue, alpha: this[SymbolState].alpha }));
    }

    set _blue(_blue) {
        if (this[SymbolState].blue === _blue) return;
        const blue = getValidValue(_blue, 0, 0xFF);
        Object.assign(this[SymbolState], compute({ red: this[SymbolState].red, green: this[SymbolState].green, blue, alpha: this[SymbolState].alpha }));
    }

    set rgb(props) {
        Object.assign(this[SymbolState], compute(parseRGB(props)));
    }

    get rgb() {
        if (this.hasTransparency()) {
            return `rgba(${Math.round(this[SymbolState].red)}, ${Math.round(this[SymbolState].green)}, ${Math.round(this[SymbolState].blue)}, ${Math.round(this[SymbolState].alpha)}%)`;
        }
        return `rgb(${Math.round(this[SymbolState].red)}, ${Math.round(this[SymbolState].green)}, ${Math.round(this[SymbolState].blue)})`;
    }

    set _hue(_hue) {
        if (this[SymbolState].hue === _hue) return;
        const hue = getValidValue(_hue, 0, 360, true);
        Object.assign(this[SymbolState], compute({ hue, saturation: this[SymbolState].saturation, lightness: this[SymbolState].lightness, alpha: this[SymbolState].alpha }));
    }

    set _saturation(_saturation) {
        if (this[SymbolState].saturation === _saturation) return;
        const saturation = getValidValue(_saturation, 0, 100);
        Object.assign(this[SymbolState], compute({ hue: this[SymbolState].hue, saturation, lightness: this[SymbolState].lightness, alpha: this[SymbolState].alpha }));
    }

    set _lightness(_lightness) {
        if (this[SymbolState].lightness === _lightness) return;
        const lightness = getValidValue(_lightness, 0, 100);
        Object.assign(this[SymbolState], compute({ hue: this[SymbolState].hue, saturation: this[SymbolState].saturation, lightness, alpha: this[SymbolState].alpha }));
    }

    set hsl(props) {
        Object.assign(this[SymbolState], compute(parseHSL(props)));
    }

    get hsl() {
        if (this.hasTransparency()) {
            return `hsla(${Math.round(this[SymbolState].hue)}, ${Math.round(this[SymbolState].saturation)}%, ${Math.round(this[SymbolState].lightness)}%, ${Math.round(this[SymbolState].alpha)}%)`;
        }
        return `hsl(${Math.round(this[SymbolState].hue)}, ${Math.round(this[SymbolState].saturation)}%, ${Math.round(this[SymbolState].lightness)}%)`;
    }

    set _whiteness(_whiteness) {
        if (this[SymbolState].whiteness === _whiteness) return;
        const whiteness = getValidValue(_whiteness, 0, 100);
        Object.assign(this[SymbolState], compute({ hue: this[SymbolState].hue, whiteness, blackness: this[SymbolState].blackness, alpha: this[SymbolState].alpha }));
    }

    set _blackness(_blackness) {
        if (this[SymbolState].blackness === _blackness) return;
        const blackness = getValidValue(_blackness, 0, 100);
        Object.assign(this[SymbolState], compute({ hue: this[SymbolState].hue, whiteness: this[SymbolState].whiteness, blackness, alpha: this[SymbolState].alpha }));
    }

    set hwb(props) {
        Object.assign(this[SymbolState], compute(parseHWB(props)));
    }

    get hwb() {
        if (this.hasTransparency()) {
            return `hwba(${this[SymbolState].hue}, ${this[SymbolState].whiteness}%, ${this[SymbolState].blackness}%, ${this[SymbolState].alpha}%)`;
        }
        return `hwb(${this[SymbolState].hue}, ${this[SymbolState].whiteness}%, ${this[SymbolState].blackness}%)`;
    }

    set _hex(props) {
        Object.assign(this[SymbolState], compute(parseHEX(props)));
    }

    set _value(props) {
        Object.assign(this[SymbolState], compute(parseValue(props)));
    }

    get yiq() {
        return (((this[SymbolState].red * 299) + (this[SymbolState].green * 587) + (this[SymbolState].blue * 114)) / 1000) >= Color.YIQ_THRESHOLD ? Color.dark : Color.light;
    }
}

const deserialize = (props, format = 'rgb') => {
    const type = typeof props;
    if (type === 'number') {
        return compute(parseValue(props));
    }
    if (type === 'string') {
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
            return compute(parseHEX(props));
        }
        if (props in NAMES) {
            return compute(parseName(props));
        }
        throw new Error(`Unknown name or format for "${props}"`);
    }
    if (type === 'object') {
        if (props instanceof Color) {
            return Object.assign({}, props[SymbolState]);
        }
        if (Array.isArray(props)) {
            if (/^hsla?$/.test(format)) {
                return compute(parseHSL(props));
            }
            if (/^hwba?$/.test(format)) {
                return compute(parseHWB(props));
            }
            return compute(parseRGB(props));
        }
        if (('red' in props || 'r' in props)
        && ('green' in props || 'g' in props)
        && ('blue' in props || 'b' in props)) {
            return compute(parseRGB(props));
        }
        if (('hue' in props || 'h' in props)
        && ('saturation' in props || 's' in props)
        && ('lightness' in props || 'l' in props)) {
            return compute(parseHSL(props));
        }
        if (('hue' in props || 'h' in props)
        && ('whiteness' in props || 'w' in props)
        && ('blackness' in props || 'b' in props)) {
            return compute(parseHWB(props));
        }
    }

    return compute({ red: 0, blue: 0, green: 0 });
};

Color.MAX_VALUE = 0xFFFFFF;
Color.YIQ_THRESHOLD = 0.6;
Color.dark = true;
Color.light = false;

module.exports = new Proxy(() => {}, {
    apply(target, that, args) {
        return Color.create(...args);
    },
    get(target, property, receiver) {
        if (property in Color.prototype) {
            return (_color, ...props) => {
                const color = Color.create(_color);
                const value = color[property];
                return typeof value === 'function' ? value.call(color, ...props) : value;
            };
        }
        if (property in Color) {
            return Reflect.get(Color, property, receiver);
        }
        return Reflect.get(target, property, receiver);
    },
});

module.exports.default = module.exports;
