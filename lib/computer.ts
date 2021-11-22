import { HEX_NAMES } from "./constants";
import { RGBtoCMYK, INTtoHEX, RGBtoHEX, RGBtoHSL, RGBtoHWB, HEXtoINT, RGBtoINT, HUEtoNCOL, HEXtoRGB, INTtoRGB, HSLtoRGB, HWBtoRGB, NCOLtoRGB, CMYKtoRGB } from "./converter";
import { getValidValue } from "./helper";
import { OptionalColor } from "./types";

interface ComputerParam {
    rgb?: boolean,
    hsl?: boolean,
    hwb?: boolean,
    cmyk?: boolean,
    nCol?: boolean,
    name?: boolean,
}

export default (props, which_compute: ComputerParam = {}) => {
    const OPTIONS = { cmyk: true, hex: true, hsl: true, hwb: true, nCol: true, value: true, rgb: true };
    which_compute = Object.assign(OPTIONS, which_compute);

    Object.assign(props, {
        red: getValidValue(props.red, 0, 0xFF),
        green: getValidValue(props.green, 0, 0xFF),
        blue: getValidValue(props.blue, 0, 0xFF),
        hue: getValidValue(props.hue, 0, 360, true),
        saturation: getValidValue(props.saturation, 0, 100),
        lightness: getValidValue(props.lightness, 0, 100),
        whiteness: getValidValue(props.whiteness, 0, 100),
        blackness: getValidValue(props.blackness, 0, 100),
        cyan: getValidValue(props.cyan, 0, 100),
        magenta: getValidValue(props.magenta, 0, 100),
        yellow: getValidValue(props.yellow, 0, 100),
        black: getValidValue(props.black, 0, 100),
    });

    const computes = [];
    if (which_compute.rgb) computes.push(computeRGB);
    if (which_compute.hsl) computes.push(computeHSL);
    if (which_compute.hwb) computes.push(computeHWB);
    if (which_compute.cmyk) computes.push(computeCMYK);
    if (which_compute.nCol) computes.push(computeNCOL);
    if (which_compute.rgb) computes.push(computeINT);
    if (which_compute.rgb) computes.push(computeHEX);
    if (which_compute.name) computes.push(computeName);
    props = computes.reduce((accu, compute) => Object.assign({}, accu, compute(accu)), props);

    return Object.assign(props, {
        alpha: props.alpha === undefined ? 100 : Number(props.alpha.toFixed(2)),
        red: Number(props.red.toFixed(0)),
        green: Number(props.green.toFixed(0)),
        blue: Number(props.blue.toFixed(0)),
        hue: Number(props.hue.toFixed(0)),
        saturation: Number(props.saturation.toFixed(2)),
        lightness: Number(props.lightness.toFixed(2)),
        whiteness: Number(props.whiteness.toFixed(2)),
        blackness: Number(props.blackness.toFixed(2)),
        cyan: Number(props.cyan.toFixed(2)),
        magenta: Number(props.magenta.toFixed(2)),
        yellow: Number(props.yellow.toFixed(2)),
        black: Number(props.black.toFixed(2)),
        nCol: `${props.nCol.substr(0, 1)}${Math.round(Number(props.nCol.substr(1)))}`,
    });
};

export const computeCMYK = (props: OptionalColor) => {
    if (['cyan', 'magenta', 'yellow', 'black'].every(key => props[key] !== undefined)) return props;
    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) {
        return Object.assign({}, props, RGBtoCMYK(props.red, props.green, props.blue));
        // } else if (['hue', 'saturation', 'lightness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, HSLtoCMYK(props.hue, props.saturation, props.lightness));
        // } else if (['hue', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, HWBtoCMYK(props.hue, props.whiteness, props.blackness));
        // } else if (['nCol', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, NCOLtoCMYK(props.nCol, props.whiteness, props.blackness));
    }
    throw new Error(`Cannot compute CMYK with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeHEX = (props: OptionalColor) => {
    if (props.hex !== undefined) return props.hex;
    if (props.value !== undefined) {
        return INTtoHEX(props.value, props.alpha);
    }
    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) {
        return RGBtoHEX(props.red, props.green, props.blue, props.alpha);
    }
    throw new Error(`Cannot compute HEX with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeHSL = (props) => {
    if (['hue', 'saturation', 'lightness'].every(key => props[key] !== undefined)) return props;
    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) {
        return Object.assign({}, props, RGBtoHSL(props.red, props.green, props.blue, props.hue));
        // } else if (['hue', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, HWBtoHSL(props.hue, props.whiteness, props.blackness));
        // } else if (['nCol', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, NCOLtoHSL(props.nCol, props.whiteness, props.blackness));
        // } else if (['cyan', 'magenta', 'yellow', 'black'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, CMYKtoHSL(props.cyan, props.magenta, props.yellow, props.black));
    }
    throw new Error(`Cannot compute HSL with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeHWB = (props) => {
    if (['hue', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) return props;
    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) {
        return Object.assign({}, props, RGBtoHWB(props.red, props.green, props.blue, props.hue));
        // } else if (['hue', 'saturation', 'lightness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, HSLtoHWB(props.hue, props.saturation, props.lightness));
        // } else if (['nCol', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, NCOLtoHWB(props.nCol, props.whiteness, props.blackness));
        // } else if (['cyan', 'magenta', 'yellow', 'black'].every(key => props[key] !== undefined)) {
        //     return Object.assign({}, props, CMYKtoHWB(props.cyan, props.magenta, props.yellow, props.black));
    }
    throw new Error(`Cannot compute HWB with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeINT = (props) => {
    if (props.value !== undefined) return props.value;
    if (props.hex !== undefined) {
        return HEXtoINT(props.hex);
    }
    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) {
        return RGBtoINT(props.red, props.green, props.blue, props.alpha);
    }
    throw new Error(`Cannot compute INT with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeName = (props) => {
    if (props.name !== undefined) return props;
    if (props.hex !== undefined && HEX_NAMES[props.hex]) {
        return Object.assign({}, props, { name: HEX_NAMES[props.hex] });
    }
};

export const computeNCOL = (props) => {
    if (props.nCol !== undefined) return props;
    if (props.hue !== undefined) {
        return Object.assign(props, { nCol: HUEtoNCOL(props.hue) });
    }
    throw new Error(`Cannot compute NCOL with keys: "${Object.keys(props).join(', ')}"`);
};

export const computeRGB = (props: OptionalColor) => {
    const middleware = (props: OptionalColor) => {
        return Object.assign({}, props, {
            hex: computeHEX(props),
            value: computeINT(props)
        });
    };

    if (['red', 'green', 'blue'].every(key => props[key] !== undefined)) return props;
    if (props.hex !== undefined) {
        return middleware(Object.assign({}, props, HEXtoRGB(props.hex)));
    }
    if (props.value !== undefined) {
        return middleware(Object.assign({}, props, INTtoRGB(props.value)));
    }
    if (['hue', 'saturation', 'lightness'].every(key => props[key] !== undefined)) {
        return middleware(Object.assign({}, props, HSLtoRGB(props.hue, props.saturation, props.lightness)));
    }
    if (['hue', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        return middleware(Object.assign({}, props, HWBtoRGB(props.hue, props.whiteness, props.blackness)));
    }
    if (['nCol', 'whiteness', 'blackness'].every(key => props[key] !== undefined)) {
        return middleware(Object.assign({}, props, NCOLtoRGB(props.nCol, props.whiteness, props.blackness)));
    }
    if (['cyan', 'magenta', 'yellow', 'black'].every(key => props[key] !== undefined)) {
        return middleware(Object.assign({}, props, CMYKtoRGB(props.cyan, props.magenta, props.yellow, props.black)));
    }
    throw new Error(`Cannot compute RGB with keys: "${Object.keys(props).join(', ')}"`);
};
