import { HEX_NAMES, HEX_REGEX } from "./constants";
import { getValidCMYK, getValidHSL, getValidHWB, getValidRGB } from "./validators";
import { CMYK, HEX, HSL, HWB, INT, NCOL, RGB } from "./types";

const HUEtoRGBChannel = (hue: number, tmp1: number, tmp2: number): number => {
    hue += 6; hue %= 6;
    if (hue < 1) return (tmp1 - tmp2) * hue + tmp2;
    if (hue < 3) return tmp1;
    if (hue < 4) return (tmp1 - tmp2) * (4 - hue) + tmp2;
    return tmp2;
};

const HUEtoNCOL = (hue: number): string => {
    hue %= 360;
    if (hue < 60) return `R${(hue / 0.6)}`;
    if (hue < 120) return `Y${((hue - 60) / 0.6)}`;
    if (hue < 180) return `G${((hue - 120) / 0.6)}`;
    if (hue < 240) return `C${((hue - 180) / 0.6)}`;
    if (hue < 300) return `B${((hue - 240) / 0.6)}`;
    if (hue < 360) return `M${((hue - 300) / 0.6)}`;

    return '';
};

const RGBtoHUE = (props: RGB, min: number, max: number): number => {
    let hue: number = ((): number => {
        if (max.toFixed(5) === min.toFixed(5)) return 0;
        switch (max) {
            case props.red: return (props.green - props.blue) / (max - min);
            case props.green: return (props.blue - props.red) / (max - min) + 2.0;
            case props.blue: return (props.red - props.green) / (max - min) + 4.0;
        }
        return 0;
    })();

    if (Number.isNaN(Number(hue))) hue = 0;
    hue *= 60;
    if (hue < 0) hue += 360;

    return hue % 360;
};

export const HEXtoINT = (props: HEX): INT => {
    return { value: parseInt(props.hex.substr(1), 16) & 0xFFFFFF };
};

export const RGBtoINT = (props: RGB): INT => {
    const value = (Math.round(props.red) << 16) + (Math.round(props.green) << 8) + Math.round(props.blue);
    return { value: value & 0xFFFFFF };
};

const HEXtoNAME = (props: HEX): HEX => {
    if (props.hex in HEX_NAMES) return { ...props, name: HEX_NAMES[props.hex] };
    return props;
};

export const INTtoHEX = (props: INT): HEX => {
    let hex = '#';
    hex += props.value.toString(16).padStart(6, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100 * 0xFF).toString(16).padStart(2, '0');
    }
    return HEXtoNAME({ hex: hex.toUpperCase() });
};

export const RGBtoHEX = (props: RGB): HEX => {
    let hex = '#';
    hex += Math.round(props.red).toString(16).padStart(2, '0');
    hex += Math.round(props.green).toString(16).padStart(2, '0');
    hex += Math.round(props.blue).toString(16).padStart(2, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100 * 0xFF).toString(16).padStart(2, '0');
    }
    return HEXtoNAME({ hex: hex.toUpperCase() });
};

export const HSLtoHEX = (props: HSL): HEX => {
    return RGBtoHEX(HSLtoRGB(props));
}

export const INTtoRGB = (props: INT): RGB => {
    return getValidRGB({
        red: (props.value >> 16) & 0xFF,
        green: (props.value >> 8) & 0xFF,
        blue: props.value & 0xFF,
    });
};

export const HEXtoRGB = (props: HEX): RGB => {
    const match = props.hex.match(HEX_REGEX);
    if (!match) {
        return getValidRGB({ red: 0, green: 0, blue: 0 });
    }
    return getValidRGB({
        red: parseInt(match[1].substr(0, 2), 16),
        green: parseInt(match[1].substr(2, 2), 16),
        blue: parseInt(match[1].substr(4, 2), 16),
    });
};

export const HSLtoRGB = (props: HSL): RGB => {
    let { hue, saturation, lightness } = props;
    hue /= 60; saturation /= 100; lightness /= 100;

    if (saturation === 0) {
        const value = lightness * 0xFF;
        return getValidRGB({ red: value, green: value, blue: value });
    }

    if (lightness === 0) {
        return getValidRGB({ red: 0, green: 0, blue: 0 });
    }
    if (lightness === 1) {
        return getValidRGB({ red: 0xFF, green: 0xFF, blue: 0xFF });
    }

    const tmp1 = lightness <= 0.5 ? (lightness * (1 + saturation)) : (lightness + saturation - lightness * saturation);
    const tmp2 = 2 * lightness - tmp1;
    return getValidRGB({
        red: HUEtoRGBChannel(hue + 2, tmp1, tmp2) * 0xFF,
        green: HUEtoRGBChannel(hue, tmp1, tmp2) * 0xFF,
        blue: HUEtoRGBChannel(hue - 2, tmp1, tmp2) * 0xFF,
    });
};

export const HWBtoRGB = (props: HWB): RGB => {
    let { hue, whiteness, blackness } = props;
    whiteness /= 100; blackness /= 100;

    const total = whiteness + blackness;
    if (total > 1) {
        whiteness /= total;
        blackness /= total;
    }

    const { red, green, blue } = HSLtoRGB({ hue, saturation: 1, lightness: 0.5 });
    const values = [red / 0xFF, green / 0xFF, blue / 0xFF];
    for (let idx = 0; idx < 3; idx++) {
        values[idx] *= (1 - whiteness - blackness);
        values[idx] += whiteness;
    }

    return getValidRGB({
        red: values[0] * 0xFF,
        green: values[1] * 0xFF,
        blue: values[2] * 0xFF,
    });
};

export const CMYKtoRGB = (props: CMYK): RGB => {
    let { cyan, magenta, yellow, black } = props;
    cyan /= 100; magenta /= 100; yellow /= 100; black /= 100;

    return getValidRGB({
        red: 0xFF - ((Math.min(1, cyan * (1 - black) + black)) * 0xFF),
        green: 0xFF - ((Math.min(1, magenta * (1 - black) + black)) * 0xFF),
        blue: 0xFF - ((Math.min(1, yellow * (1 - black) + black)) * 0xFF),
    });
};

export const RGBtoHSL = (props: RGB, hue?: number): HSL => {
    let { red, green, blue } = props;
    red /= 0xFF; green /= 0xFF; blue /= 0xFF;

    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2.0;
    if (min === max) {
        return getValidHSL({
            hue: 0,
            saturation: 0,
            lightness: lightness * 100
        });
    }

    let saturation = (max - min) / (2.0 - max - min);
    if (lightness < 0.5) saturation = (max - min) / (max + min);
    return getValidHSL({
        hue: hue || RGBtoHUE({ red, green, blue }, min, max),
        saturation: saturation * 100,
        lightness: lightness * 100,
    });
};

export const NCOLtoHWB = (props: NCOL): HWB => {
    let { ncol, whiteness, blackness } = props;
    if (!Number.isNaN(Number(String(ncol).substr(0, 1)))) return { hue: Number(ncol), whiteness, blackness };

    const letter = String(ncol).substr(0, 1).toUpperCase();
    const percent = Number(String(ncol).substr(1) || 0);
    if (Number.isNaN(Number(percent))) {
        return getValidHWB({
            hue: 0,
            whiteness: 0,
            blackness: 100
        });
    }

    let hue = 0;
    if (letter === 'R') hue = percent * 0.6;
    if (letter === 'Y') hue = 60 + percent * 0.6;
    if (letter === 'G') hue = 120 + percent * 0.6;
    if (letter === 'C') hue = 180 + percent * 0.6;
    if (letter === 'B') hue = 240 + percent * 0.6;
    if (letter === 'M') hue = 300 + percent * 0.6;
    if (letter === 'W') {
        hue = 0;
        whiteness = 1 - (percent / 100);
        blackness = percent / 100;
    }

    return getValidHWB({ hue, whiteness, blackness });
};

export const RGBtoHWB = (props: RGB, hue?: number): HWB => {
    const max = Math.max(props.red, props.green, props.blue);
    const min = Math.min(props.red, props.green, props.blue);

    return getValidHWB({
        hue: hue || RGBtoHUE(props, min, max),
        whiteness: min / 0xFF * 100,
        blackness: (0xFF - max) / 0xFF * 100,
    });
};

export const RGBtoCMYK = (props: RGB): CMYK => {
    let { red, green, blue } = props;
    red /= 0xFF; green /= 0xFF; blue /= 0xFF;

    const max = Math.max(red, green, blue);
    if (max === 0) {
        return getValidCMYK({
            cyan: 0,
            magenta: 0,
            yellow: 0,
            black: 100
        });
    }

    const black = 1.0 - max;
    return getValidCMYK({
        cyan: (1.0 - red - black) / max * 100,
        magenta: (1.0 - green - black) / max * 100,
        yellow: (1.0 - blue - black) / max * 100,
        black: black * 100,
    });
};
