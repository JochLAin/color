export type Color = number | string | number[] | RGB | HSL | HWB;

export interface ColorInterface extends RGB, HSL, CMYK, HWB {
    alpha: number,
    hex: string,
    name: string,
    nCol: string,
    value: number,
}

export interface CMYK {
    cyan: number,
    magenta: number,
    yellow: number,
    black: number,
}

export interface RGB {
    red: number,
    blue: number,
    green: number,
    alpha?: number,
}

export interface HSL {
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number,
}

export interface HWB {
    hue: number,
    whiteness: number,
    blackness: number,
}

export interface CMYK {
    cyan: number,
    magenta: number,
    yellow: number,
    black: number,
}
