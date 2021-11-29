import { HUEtoRGB, RGBtoHUE, HUEtoNCOL } from "./converters/basic";
import { HEX_NAMES, HEX_REGEX } from "./constants";
import { getValidCMYK, getValidHSL, getValidHWB, getValidRGB } from "./validators";
import { CMYK, HEX, HSL, HWB, INT, NCOL, RGB } from "./types";

export const HEXtoINT = (props: HEX): INT => {
    return { value: parseInt(props.hex.substr(1), 16) & 0xFFFFFF };
};

export const RGBtoINT = (props: RGB): INT => {
    const value = (Math.round(props.red) << 16) + (Math.round(props.green) << 8) + Math.round(props.blue);
    return { value: value & 0xFFFFFF };
};

export const HSLtoINT = (props: HSL): INT => {
    return HEXtoINT(HSLtoHEX(props));
};

const HEXtoNAME = (props: HEX): HEX => {
    if (props.hex in HEX_NAMES) return { ...props, name: HEX_NAMES[props.hex] };
    return props;
};

export const INTtoHEX = (props: INT): HEX => {
    let hex = '#';
    hex += props.value.toString(16).padStart(6, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100.0 * 255.0).toString(16).padStart(2, '0');
    }
    return HEXtoNAME({ hex: hex.toUpperCase() });
};

export const RGBtoHEX = (props: RGB): HEX => {
    let hex = '#';
    hex += Math.round(props.red).toString(16).padStart(2, '0');
    hex += Math.round(props.green).toString(16).padStart(2, '0');
    hex += Math.round(props.blue).toString(16).padStart(2, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100.0 * 255.0).toString(16).padStart(2, '0');
    }
    return HEXtoNAME({ hex: hex.toUpperCase() });
};

export const HSLtoHEX = (props: HSL): HEX => {
    return RGBtoHEX(HSLtoRGB(props));
}

export const INTtoRGB = (props: INT): RGB => {
    return getValidRGB({
        red: (props.value >> 16) & 255.0,
        green: (props.value >> 8) & 255.0,
        blue: props.value & 255.0,
    });
};

export const HEXtoRGB = (props: HEX): RGB => {
    const match = props.hex.match(HEX_REGEX);
    if (!match) {
        return getValidRGB({ red: 0.0, green: 0.0, blue: 0.0 });
    }
    return getValidRGB({
        red: parseInt(match[1].slice(0, 2), 16),
        green: parseInt(match[1].slice(2, 4), 16),
        blue: parseInt(match[1].slice(4, 6), 16),
    });
};

export const HSLtoRGB = (props: HSL): RGB => {
    let { hue, saturation, lightness } = props;
    hue /= 60; saturation /= 100.0; lightness /= 100.0;

    if (saturation === 0) {
        const value = lightness * 255.0;
        return getValidRGB({ red: value, green: value, blue: value });
    }

    if (lightness === 0) {
        return getValidRGB({ red: 0.0, green: 0.0, blue: 0.0 });
    }
    if (lightness === 1) {
        return getValidRGB({ red: 255.0, green: 255.0, blue: 255.0 });
    }

    const tmp1 = lightness <= 0.5 ? (lightness * (1 + saturation)) : (lightness + saturation - lightness * saturation);
    const tmp2 = 2.0 * lightness - tmp1;
    return getValidRGB({
        red: HUEtoRGB(hue + 2, tmp1, tmp2) * 255.0,
        green: HUEtoRGB(hue, tmp1, tmp2) * 255.0,
        blue: HUEtoRGB(hue - 2, tmp1, tmp2) * 255.0,
    });
};

export const HWBtoRGB = (props: HWB): RGB => {
    let { hue, whiteness, blackness } = props;
    whiteness /= 100.0; blackness /= 100.0;

    const total = whiteness + blackness;
    if (total > 1) {
        whiteness /= total;
        blackness /= total;
    }

    const { red, green, blue } = HSLtoRGB({ hue, saturation: 1, lightness: 0.5 });
    const values = [red / 255.0, green / 255.0, blue / 255.0];
    for (let idx = 0; idx < 3; idx++) {
        values[idx] *= (1 - whiteness - blackness);
        values[idx] += whiteness;
    }

    return getValidRGB({
        red: values[0] * 255.0,
        green: values[1] * 255.0,
        blue: values[2] * 255.0,
    });
};

export const CMYKtoRGB = (props: CMYK): RGB => {
    let { cyan, magenta, yellow, black } = props;
    cyan /= 100.0; magenta /= 100.0; yellow /= 100.0; black /= 100.0;

    return getValidRGB({
        red: 255.0 - ((Math.min(1, cyan * (1 - black) + black)) * 255.0),
        green: 255.0 - ((Math.min(1, magenta * (1 - black) + black)) * 255.0),
        blue: 255.0 - ((Math.min(1, yellow * (1 - black) + black)) * 255.0),
    });
};

export const INTtoHSL = (props: INT): HSL => {
    return RGBtoHSL(INTtoRGB(props));
};

export const HEXtoHSL = (props: HEX): HSL => {
    return RGBtoHSL(HEXtoRGB(props));
};

export const RGBtoHSL = (props: RGB, hue?: number): HSL => {
    let { red, green, blue } = props;
    red /= 255.0; green /= 255.0; blue /= 255.0;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    const sum = max + min;

    const lightness = sum / 2.0;
    if (min === max) {
        return getValidHSL({
            hue: 0.0,
            saturation: 0.0,
            lightness: lightness * 100.0,
        });
    }

    let saturation = delta / (2.0 - delta);
    if (lightness < 0.5) saturation = delta / sum;
    return getValidHSL({
        hue: hue || RGBtoHUE({ red, green, blue }, min, max),
        saturation: saturation * 100.0,
        lightness: lightness * 100.0,
    });
};

export const NCOLtoHWB = (props: NCOL): HWB => {
    let { ncol, whiteness, blackness } = props;
    if (!Number.isNaN(Number(String(ncol).substr(0, 1)))) return { hue: Number(ncol), whiteness, blackness };

    const letter = String(ncol).substr(0, 1).toUpperCase();
    const percent = Number(String(ncol).substr(1) || 0.0);
    if (Number.isNaN(Number(percent))) {
        return getValidHWB({
            hue: 0.0,
            whiteness: 0.0,
            blackness: 100.0
        });
    }

    let hue = 0;
    if (letter === 'R') hue = percent * 0.6;
    if (letter === 'Y') hue = 60.0 + percent * 0.6;
    if (letter === 'G') hue = 120.0 + percent * 0.6;
    if (letter === 'C') hue = 180.0 + percent * 0.6;
    if (letter === 'B') hue = 240.0 + percent * 0.6;
    if (letter === 'M') hue = 300.0 + percent * 0.6;
    if (letter === 'W') {
        hue = 0.0;
        whiteness = 1.0 - (percent / 100.0);
        blackness = percent / 100.0;
    }

    return getValidHWB({ hue, whiteness, blackness });
};

export const RGBtoHWB = (props: RGB, hue?: number): HWB => {
    const max = Math.max(props.red, props.green, props.blue);
    const min = Math.min(props.red, props.green, props.blue);

    return getValidHWB({
        hue: hue || RGBtoHUE(props, min, max),
        whiteness: min / 255.0 * 100.0,
        blackness: (255.0 - max) / 255.0 * 100.0,
    });
};

export const HSLtoHWB = (props: HSL): HWB => {
    return RGBtoHWB(HSLtoRGB(props));
};

export const RGBtoCMYK = (props: RGB): CMYK => {
    let { red, green, blue } = props;
    red /= 255.0; green /= 255.0; blue /= 255.0;

    const max = Math.max(red, green, blue);
    if (max === 0) {
        return getValidCMYK({
            cyan: 0.0,
            magenta: 0.0,
            yellow: 0.0,
            black: 100.0
        });
    }

    const black = 1.0 - max;
    return getValidCMYK({
        cyan: (1.0 - red - black) / max * 100.0,
        magenta: (1.0 - green - black) / max * 100.0,
        yellow: (1.0 - blue - black) / max * 100.0,
        black: black * 100.0,
    });
};

export const RGBtoNCOL = (props: RGB): NCOL => {
    const hwb = RGBtoHWB(props);
    return {
        ncol: HUEtoNCOL(hwb.hue),
        whiteness: hwb.whiteness,
        blackness: hwb.blackness,
    };
};

export const HSLtoNCOL = (props: HSL): NCOL => {
    const hwb = HSLtoHWB(props);
    return {
        ncol: HUEtoNCOL(hwb.hue),
        whiteness: hwb.whiteness,
        blackness: hwb.blackness,
    };
};
