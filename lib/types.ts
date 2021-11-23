export type ColorInput = number | string | number[] | INT | HEX | RGB | sRGB | HSL | sHSL | HWB | sHWB | NCOL | sNCOL;
export type ColorOutput = INT | HEX | RGB | HSL | CMYK | HWB | NCOL;

export interface COLOR {
    red?: number,
    blue?: number,
    green?: number,
    hue?: number,
    saturation?: number,
    lightness?: number,
    whiteness?: number,
    blackness?: number,
    cyan?: number,
    magenta?: number,
    yellow?: number,
    black?: number,
    alpha?: number,
    hex?: string,
    name?: string,
    ncol?: string,
    value?: number,
}

export interface INT {
    value: number,
    alpha?: number,
}

export interface HEX {
    hex: string,
    name?: string,
    alpha?: number,
}

export interface RGB {
    red: number,
    green: number,
    blue: number,
    alpha?: number,
}

export interface sRGB {
    r: number,
    g: number,
    b: number,
    a?: number,
}

export interface HSL {
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number,
}

export interface sHSL {
    h: number,
    s: number,
    l: number,
    a?: number,
}

export interface HWB {
    hue: number,
    whiteness: number,
    blackness: number,
    alpha?: number,
}

export interface sHWB {
    h: number,
    w: number,
    b: number,
    a?: number,
}

export interface CMYK {
    cyan: number,
    magenta: number,
    yellow: number,
    black: number,
    alpha?: number,
}

export interface sCMYK {
    c: number,
    m: number,
    y: number,
    k: number,
    a?: number,
}

export interface NCOL {
    ncol: string,
    whiteness: number,
    blackness: number,
    alpha?: number,
}

export interface sNCOL {
    n: string,
    w: number,
    b: number,
    a?: number,
}

export type COLOR_TYPE = INT | HEX | RGB | HSL | HWB | CMYK | NCOL;
export type COLOR_INPUT = number | string | number[] | sRGB | sHSL | sHWB | sCMYK | sNCOL | COLOR_TYPE;
