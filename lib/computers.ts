import { HEXtoHSL, HEXtoINT, HEXtoRGB, HSLtoHEX, HSLtoINT, HSLtoRGB, HWBtoRGB, INTtoHEX, INTtoRGB, INTtoHSL, NCOLtoHWB, RGBtoCMYK, RGBtoHEX, RGBtoHSL, RGBtoHWB, RGBtoINT, RGBtoNCOL } from "./converters";
import { COLOR, COLOR_TYPE, CMYK, HEX, HSL, HWB, INT, NCOL, RGB } from "./types";
import { isCMYK, isHEX, isHSL, isHWB, isINT, isNCOL, isRGB } from "./utils";

export const computeCMYK = (props: COLOR_TYPE): COLOR => {
    if (isCMYK(props)) return props;
    // if (isINT(props)) return INTtoCMYK(props as INT);
    if (isRGB(props)) return RGBtoCMYK(props as RGB);
    // if (isHSL(props)) return HSLtoCMYK(props as HSL);
    // if (isHWB(props)) return HWBtoCMYK(props as HWB);
    // if (isNCOL(props)) return NCOLtoCMYK(props as NCOL);
    throw new Error('Unable to compute cmyk value');
};

export const computeHEX = (props: COLOR_TYPE): COLOR => {
    if (isHEX(props)) return props;
    if (isINT(props)) return INTtoHEX(props as INT);
    if (isRGB(props)) return RGBtoHEX(props as RGB);
    if (isHSL(props)) return HSLtoHEX(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute hex value');
};

export const computeHSL = (props: COLOR_TYPE): COLOR => {
    if (isHSL(props)) return props;
    if (isINT(props)) return INTtoHSL(props as INT);
    if (isHEX(props)) return HEXtoHSL(props as HEX);
    if (isRGB(props)) return RGBtoHSL(props as RGB);
    // if (isHWB(props)) return HWBtoHSL(props as HWB);
    // if (isNCOL(props)) return NCOLtoHSL(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHSL(props as CMYK);
    throw new Error('Unable to compute hsl value');
};

export const computeHWB = (props: COLOR_TYPE): COLOR => {
    if (isHWB(props)) return props;
    // if (isINT(props)) return INTtoHWB(props as INT);
    // if (isHEX(props)) return HEXtoHWB(props as HEX);
    if (isRGB(props)) return RGBtoHWB(props as RGB);
    // if (isHSL(props)) return HSLtoHWB(props as HSL);
    if (isNCOL(props)) return NCOLtoHWB(props as NCOL);
    // if (isCMYK(props)) return CMYKtoHWB(props as CMYK);
    throw new Error('Unable to compute hwb value');
};

export const computeINT = (props: COLOR_TYPE): COLOR => {
    if (isINT(props)) return props;
    if (isHEX(props)) return HEXtoINT(props as HEX);
    if (isRGB(props)) return RGBtoINT(props as RGB);
    if (isHSL(props)) return HSLtoINT(props as HSL);
    // if (isHWB(props)) return HWBtoINT(props as HWB);
    // if (isNCOL(props)) return NCOLtoINT(props as NCOL);
    // if (isCMYK(props)) return CMYKtoINT(props as CMYK);
    throw new Error('Unable to compute number value');
};

export const computeNCOL = (props: COLOR_TYPE): COLOR => {
    if (isRGB(props)) return RGBtoNCOL(props as RGB);
    throw new Error('Unable to compute ncol value');
};

export const computeRGB = (props: COLOR_TYPE): COLOR => {
    if (isRGB(props)) return props;
    if (isINT(props)) return INTtoRGB(props as INT);
    if (isHEX(props)) return HEXtoRGB(props as HEX);
    if (isHSL(props)) return HSLtoRGB(props as HSL);
    if (isHWB(props)) return HWBtoRGB(props as HWB);
    // if (isNCOL(props)) return NCOLtoRGB(props as NCOL);
    // if (isCMYK(props)) return CMYKtoRGB(props as CMYK);
    throw new Error('Unable to compute rgb value');
};
