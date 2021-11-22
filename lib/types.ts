export type ColorInput = number | string | number[] | RGB | HSL | HWB | ShortcutRGB | ShortcutHSL | ShortcutHWB | ShortcutCMYK;
export type ColorOutput = RGB | HSL | HWB | { value: number, alpha?: number } | { hex: string, alpha?: number };

export interface Color extends RGB, HSL, CMYK, HWB {
    hex: string,
    name: string,
    nCol: string,
    value: number,
}

export interface RGB {
    red: number,
    blue: number,
    green: number,
    alpha?: number,
}

export interface ShortcutRGB {
    r: number,
    b: number,
    g: number,
    a?: number,
}

export interface HSL {
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number,
}

export interface ShortcutHSL {
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

export interface ShortcutHWB {
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

export interface ShortcutCMYK {
    c: number,
    m: number,
    y: number,
    k: number,
    a?: number,
}
