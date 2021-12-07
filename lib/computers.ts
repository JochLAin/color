import { hex2hsl, hex2int, hex2rgb, hsl2hex, hsl2int, hsl2rgb, hwb2rgb, int2hex, int2rgb, int2hsl, ncol2hwb, rgb2cmyk, rgb2hex, rgb2hsl, rgb2hwb, rgb2int, rgb2ncol } from "./converters";
import { COLOR, COLOR_TYPE, CMYK, HEX, HSL, HWB, INT, NCOL, RGB } from "./types";
import { isCMYK, isHEX, isHSL, isHWB, isINT, isNCOL, isRGB } from "./utils";

export const computeCMYK = (props: COLOR_TYPE): COLOR => {
    if (isCMYK(props)) return props;
    // if (isINT(props)) return INTtoCMYK(props as INT);
    if (isRGB(props)) return rgb2cmyk(props as RGB);
    // if (isHSL(props)) return HSLtoCMYK(props as HSL);
    // if (isHWB(props)) return HWBtoCMYK(props as HWB);
    // if (isNCOL(props)) return NCOLtoCMYK(props as NCOL);
    throw new Error('Unable to compute cmyk value');
};

export const computeHEX = (props: COLOR_TYPE): COLOR => {
    if (isHEX(props)) return props;
    if (isINT(props)) return int2hex(props as INT);
    if (isRGB(props)) return rgb2hex(props as RGB);
    if (isHSL(props)) return hsl2hex(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute hex value');
};

export const computeHSL = (props: COLOR_TYPE): COLOR => {
    if (isHSL(props)) return props;
    if (isINT(props)) return int2hsl(props as INT);
    if (isHEX(props)) return hex2hsl(props as HEX);
    if (isRGB(props)) return rgb2hsl(props as RGB);
    // if (isHWB(props)) return HWBtoHSL(props as HWB);
    // if (isNCOL(props)) return NCOLtoHSL(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHSL(props as CMYK);
    throw new Error('Unable to compute hsl value');
};

export const computeHWB = (props: COLOR_TYPE): COLOR => {
    if (isHWB(props)) return props;
    // if (isINT(props)) return INTtoHWB(props as INT);
    // if (isHEX(props)) return HEXtoHWB(props as HEX);
    if (isRGB(props)) return rgb2hwb(props as RGB);
    // if (isHSL(props)) return HSLtoHWB(props as HSL);
    if (isNCOL(props)) return ncol2hwb(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHWB(props as CMYK);
    throw new Error('Unable to compute hwb value');
};

export const computeINT = (props: COLOR_TYPE): COLOR => {
    if (isINT(props)) return props;
    if (isHEX(props)) return hex2int(props as HEX);
    if (isRGB(props)) return rgb2int(props as RGB);
    if (isHSL(props)) return hsl2int(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute number value');
};

export const computeNCOL = (props: COLOR_TYPE): COLOR => {
    if (isRGB(props)) return rgb2ncol(props as RGB);
    throw new Error('Unable to compute ncol value');
};

export const computeRGB = (props: COLOR_TYPE): COLOR => {
    if (isRGB(props)) return props;
    if (isINT(props)) return int2rgb(props as INT);
    if (isHEX(props)) return hex2rgb(props as HEX);
    if (isHSL(props)) return hsl2rgb(props as HSL);
    if (isHWB(props)) return hwb2rgb(props as HWB);
    // if (isNCOL(props)) return NCOLtoRGB(props as NCOL);
    // if (isCMYK(props)) return CMYKtoRGB(props as CMYK);
    throw new Error('Unable to compute rgb value');
};
