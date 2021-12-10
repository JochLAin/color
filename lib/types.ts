export type PROPERTY_MATH =
    'red'|'green'|'blue'|
    'cyan'|'magenta'|'yellow'|'black'|
    'hue'|'saturation'|'intensity'|'lightness'|'value'|'white'|
    'chroma'|'luma'|
    'alpha'
;

export type CMYK = { cyan: number, magenta: number, yellow: number, black: number, alpha?: number };
export type HCL = { hue: number, chroma: number, luma: number, alpha?: number };
export type HEX = { hex: string, name?: string, alpha?: number };
export type HSI = { hue: number, saturation: number, intensity: number, alpha?: number };
export type HSL = { hue: number, saturation: number, lightness: number, alpha?: number };
export type HSV = { hue: number, saturation: number, value: number, alpha?: number };
export type HWB = { hue: number, white: number, black: number, alpha?: number };
export type INT = { int: number, alpha?: number };
export type NCOL = { ncol: string, white: number, black: number, alpha?: number };
export type RGB = { red: number, blue: number, green: number, alpha?: number };

export type aCMYK = [number, number, number, number, number?];
export type aHCL = [number, number, number, number?];
export type aHEX = [string, number?];
export type aHSI = [number, number, number, number?];
export type aHSL = [number, number, number, number?];
export type aHSV = [number, number, number, number?];
export type aHWB = [number, number, number, number?];
export type aINT = [number, number?];
export type aNCOL = [string, number, number, number?];
export type aRGB = [number, number, number, number?];

export type sCMYK = { c: number, m: number, y: number, k: number, a?: number };
export type sHCL = { h: number, c: number, l: number, a?: number };
export type sHEX = { h: number, a?: number };
export type sHSI = { h: number, s: number, i: number, a?: number };
export type sHSL = { h: number, s: number, l: number, a?: number };
export type sHSV = { h: number, s: number, v: number, a?: number };
export type sHWB = { h: number, w: number, b: number, a?: number };
export type sINT = { i: number, a?: number };
export type sNCOL = { n: string, w: number, b: number, a?: number };
export type sRGB = { r: number, g: number, b: number, a?: number };

export type oCMYK = { cyan?: number, magenta?: number, yellow?: number, black?: number, alpha?: number };
export type oHCL = { hue?: number, chroma?: number, luma?: number, alpha?: number };
export type oHEX = { hex?: string, name?: string, alpha?: number };
export type oHSI = { hue?: number, saturation?: number, intensity?: number, alpha?: number };
export type oHSL = { hue?: number, saturation?: number, lightness?: number, alpha?: number };
export type oHSV = { hue?: number, saturation?: number, value?: number, alpha?: number };
export type oHWB = { hue?: number, white?: number, black?: number, alpha?: number };
export type oINT = { int?: number, alpha?: number };
export type oNCOL = { ncol?: string, white?: number, black?: number, alpha?: number };
export type oRGB = { red?: number, blue?: number, green?: number, alpha?: number };

export type soRGB = { r?: number, g?: number, b?: number, a?: number };
export type soHCL = { h?: number, c?: number, l?: number, a?: number };
export type soHSI = { h?: number, s?: number, i?: number, a?: number };
export type soHSL = { h?: number, s?: number, l?: number, a?: number };
export type soHSV = { h?: number, s?: number, v?: number, a?: number };
export type soHWB = { h?: number, w?: number, b?: number, a?: number };
export type soCMYK = { c?: number, m?: number, y?: number, k?: number, a?: number };
export type soNCOL = { n?: string, w?: number, b?: number, a?: number };

export type COLOR_TYPE = CMYK | HCL | HEX | HSI | HSL | HSV | HWB | INT | NCOL | RGB;
export type COLOR_ARRAY = aCMYK | aHCL | aHEX | aHSI | aHSL | aHSV | aHWB | aINT | aNCOL | aRGB;
export type COLOR_OPTIONAL = oCMYK | oHCL | oHEX | oHSI | oHSL | oHSV | oHWB | oINT | oNCOL | oRGB;
export type COLOR_SHORTCUT = sCMYK | sHCL | sHEX | sHSI | sHSL | sHSV | sHWB | sINT | sNCOL | sRGB;
export type COLOR_INPUT = number | string | COLOR_TYPE | COLOR_ARRAY | COLOR_SHORTCUT;

export interface COLOR_CMYK { cyan?: number, magenta?: number, yellow?: number, black?: number, alpha?: number }
export interface COLOR_HCL { hue2?: number, chroma?: number, chroma2?: number, luma?: number, alpha?: number }
export interface COLOR_HEX { hex?: string, name?: string, alpha?: number }
export interface COLOR_HSI { hue?: number, saturationHSI?: number, intensity?: number, alpha?: number }
export interface COLOR_HSL { hue?: number, saturationHSL?: number, lightness?: number, alpha?: number }
export interface COLOR_HSV { hue?: number, saturationHSV?: number, value?: number, alpha?: number }
export interface COLOR_HWB { hue?: number, white?: number, black?: number, alpha?: number }
export interface COLOR_INT { int?: number, alpha?: number }
export interface COLOR_RGB { red?: number, green?: number, blue?: number, alpha?: number }
export interface COLOR_NCOL { ncol?: string, white?: number, black?: number, alpha?: number }

export interface COLOR extends COLOR_CMYK, COLOR_HCL, COLOR_HEX, COLOR_HSI, COLOR_HSL, COLOR_HSV, COLOR_HWB, COLOR_INT, COLOR_NCOL, COLOR_RGB {
}
