export type PROPERTY_MATH =
    'red'|'green'|'blue'
    |'cyan'|'magenta'|'yellow'|'black'
    |'hue'|'saturation'|'intensity'|'lightness'|'value'|'white'
    |'chroma'|'luma'
    |'alpha'
;

export type PropType = number|string;

export type CMYK_OBJECT = { cyan: PropType, magenta: PropType, yellow: PropType, black: PropType, alpha?: PropType };
export type HCL_OBJECT = { hue2: PropType, chroma2: PropType, luma_601: PropType, alpha?: PropType };
export type HEX_OBJECT = { hex: string, name?: string, alpha?: PropType };
export type HSI_OBJECT = { hue: PropType, saturation: PropType, intensity: PropType, alpha?: PropType };
export type HSL_OBJECT = { hue: PropType, saturation: PropType, lightness: PropType, alpha?: PropType };
export type HSV_OBJECT = { hue: PropType, saturation: PropType, brightness: PropType, alpha?: PropType };
export type HWB_OBJECT = { hue: PropType, white: PropType, black: PropType, alpha?: PropType };
export type INT_OBJECT = { int: PropType, alpha?: PropType };
export type NCOL_OBJECT = { ncol: string, white: PropType, black: PropType, alpha?: PropType };
export type RGB_OBJECT = { red: PropType, blue: PropType, green: PropType, alpha?: PropType };
export type COLOR_OBJECT = CMYK_OBJECT | HCL_OBJECT | HEX_OBJECT | HSI_OBJECT | HSL_OBJECT | HSV_OBJECT | HWB_OBJECT | INT_OBJECT | NCOL_OBJECT | RGB_OBJECT;

export type CMYK_OPTION = { cyan?: PropType, magenta?: PropType, yellow?: PropType, black?: PropType, alpha?: PropType };
export type HCL_OPTION = { hue?: PropType, chroma?: PropType, luma?: PropType, alpha?: PropType };
export type HEX_OPTION = { hex?: string, name?: string, alpha?: PropType };
export type HSI_OPTION = { hue?: PropType, saturation?: PropType, intensity?: PropType, alpha?: PropType };
export type HSL_OPTION = { hue?: PropType, saturation?: PropType, lightness?: PropType, alpha?: PropType };
export type HSV_OPTION = { hue?: PropType, saturation?: PropType, value?: PropType, alpha?: PropType };
export type HWB_OPTION = { hue?: PropType, white?: PropType, black?: PropType, alpha?: PropType };
export type INT_OPTION = { int?: PropType, alpha?: PropType };
export type NCOL_OPTION = { ncol?: string, white?: PropType, black?: PropType, alpha?: PropType };
export type RGB_OPTION = { red?: PropType, blue?: PropType, green?: PropType, alpha?: PropType };

export type CMYK_ARRAY = [PropType, PropType, PropType, PropType, PropType?];
export type HCL_ARRAY = [PropType, PropType, PropType, PropType?];
export type HEX_ARRAY = [string, PropType?];
export type HSI_ARRAY = [PropType, PropType, PropType, PropType?];
export type HSL_ARRAY = [PropType, PropType, PropType, PropType?];
export type HSV_ARRAY = [PropType, PropType, PropType, PropType?];
export type HWB_ARRAY = [PropType, PropType, PropType, PropType?];
export type INT_ARRAY = [PropType, PropType?];
export type NCOL_ARRAY = [string, PropType, PropType, PropType?];
export type RGB_ARRAY = [PropType, PropType, PropType, PropType?];
// export type COLOR_ARRAY = CMYK_ARRAY | HCL_ARRAY | HEX_ARRAY | HSI_ARRAY | HSL_ARRAY | HSV_ARRAY | HWB_ARRAY | INT_ARRAY | NCOL_ARRAY | RGB_ARRAY;

export type CMYK_SHORTCUT = { c: PropType, m: PropType, y: PropType, k: PropType, a?: PropType };
export type HCL_SHORTCUT = { h: PropType, c: PropType, l: PropType, a?: PropType };
export type HEX_SHORTCUT = { h: PropType, n?: string, a?: PropType };
export type HSI_SHORTCUT = { h: PropType, s: PropType, i: PropType, a?: PropType };
export type HSL_SHORTCUT = { h: PropType, s: PropType, l: PropType, a?: PropType };
export type HSV_SHORTCUT = { h: PropType, s: PropType, v: PropType, a?: PropType };
export type HWB_SHORTCUT = { h: PropType, w: PropType, b: PropType, a?: PropType };
export type INT_SHORTCUT = { i: PropType, a?: PropType };
export type NCOL_SHORTCUT = { n: string, w: PropType, b: PropType, a?: PropType };
export type RGB_SHORTCUT = { r: PropType, g: PropType, b: PropType, a?: PropType };
// export type COLOR_SHORTCUT = CMYK_SHORTCUT | HCL_SHORTCUT | HEX_SHORTCUT | HSI_SHORTCUT | HSL_SHORTCUT | HSV_SHORTCUT | HWB_SHORTCUT | INT_SHORTCUT | NCOL_SHORTCUT | RGB_SHORTCUT;

export type CMYK_SHORTCUT_OPTION = { c?: PropType, m?: PropType, y?: PropType, k?: PropType, a?: PropType };
export type HCL_SHORTCUT_OPTION = { h?: PropType, c?: PropType, l?: PropType, a?: PropType };
export type HEX_SHORTCUT_OPTION = { h?: PropType, n?: string, a?: PropType };
export type HSI_SHORTCUT_OPTION = { h?: PropType, s?: PropType, i?: PropType, a?: PropType };
export type HSL_SHORTCUT_OPTION = { h?: PropType, s?: PropType, l?: PropType, a?: PropType };
export type HSV_SHORTCUT_OPTION = { h?: PropType, s?: PropType, v?: PropType, a?: PropType };
export type HWB_SHORTCUT_OPTION = { h?: PropType, w?: PropType, b?: PropType, a?: PropType };
export type INT_SHORTCUT_OPTION = { i?: PropType, a?: PropType };
export type NCOL_SHORTCUT_OPTION = { n?: string, w?: PropType, b?: PropType, a?: PropType };
export type RGB_SHORTCUT_OPTION = { r?: PropType, g?: PropType, b?: PropType, a?: PropType };
// export type COLOR_SHORTCUT_OPTION = CMYK_SHORTCUT_OPTION | HCL_SHORTCUT_OPTION | HEX_SHORTCUT_OPTION | HSI_SHORTCUT_OPTION | HSL_SHORTCUT_OPTION | HSV_SHORTCUT_OPTION | HWB_SHORTCUT_OPTION | INT_SHORTCUT_OPTION | NCOL_SHORTCUT_OPTION | RGB_SHORTCUT_OPTION;

export type CMYK = string | CMYK_OBJECT | CMYK_SHORTCUT | CMYK_ARRAY;
export type HCL = string | HCL_OBJECT | HCL_SHORTCUT | HCL_ARRAY;
export type HEX = string | HEX_OBJECT | HEX_SHORTCUT | HEX_ARRAY;
export type HSI = string | HSI_OBJECT | HSI_SHORTCUT | HSI_ARRAY;
export type HSL = string | HSL_OBJECT | HSL_SHORTCUT | HSL_ARRAY;
export type HSV = string | HSV_OBJECT | HSV_SHORTCUT | HSV_ARRAY;
export type HWB = string | HWB_OBJECT | HWB_SHORTCUT | HWB_ARRAY;
export type INT = number | INT_OBJECT | INT_SHORTCUT | INT_ARRAY;
export type RGB = string | RGB_OBJECT | RGB_SHORTCUT | RGB_ARRAY;

export type COLOR_INPUT = CMYK | HCL | HEX | HSI | HSL | HSV | INT | RGB;
export type COLOR_OPTION = CMYK_OPTION & HCL_OPTION & HEX_OPTION & HSI_OPTION & HSL_OPTION & HSV_OPTION & HWB_OPTION & INT_OPTION & NCOL_OPTION & RGB_OPTION;
export interface COLOR extends COLOR_OPTION {
    brightness?: PropType;
    chroma?: PropType;
    dullness?: PropType;
    hanbury?: PropType;
    luma_240?: PropType;
    luma_601?: PropType;
    luma_709?: PropType;
    luma_2020?: PropType;
    saturation_hsl?: PropType;
    saturation_hsi?: PropType;
    saturation_hsv?: PropType;
    serra?: PropType;
    sum?: PropType;
    yiq?: boolean;
}
