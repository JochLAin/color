import { COLOR } from "./types";

const DEFAULT_COLOR: COLOR = {
    name: 'black',
    int: 0,
    hex: '#000000',
    red: 0,
    green: 0,
    blue: 0,
    cyan: 0,
    magenta: 0,
    yellow: 0,
    white: 0,
    black: 100,
    hue: 0,
    ncol: 'R0',
    saturation_hsi: 0,
    saturation_hsl: 0,
    saturation_hsv: 0,
    lightness: 0,
    value: 0,
    alpha: 100,
};

export default DEFAULT_COLOR;

export const HEX_MAX_VALUE = 0xFFFFFF;
export const YIQ_THRESHOLD = 0.6;
export const DARK = true;
export const LIGHT = false;

export const HEX_REGEXP = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const INTEGER_REGEXP = /^([-+]?[0-9]+)$/i;
const int_source = INTEGER_REGEXP.source.slice(1, -1);
export const NUMBER_REGEXP = new RegExp(`^(${int_source}|(${int_source})?.\\d+|${int_source}e${int_source}|(${int_source})?.\\d+e${int_source})$`, 'i');
const num_source = NUMBER_REGEXP.source.slice(1, -1);
export const PERCENTAGE_REGEXP = new RegExp(`^(${num_source}%)$`, 'i');
const per_source = PERCENTAGE_REGEXP.source.slice(1, -1);
export const ALPHA_REGEXP = new RegExp(`^(${per_source}|${num_source})$`, 'i');
const alf_source = ALPHA_REGEXP.source.slice(1, -1);
export const ANGLE_REGEXP = new RegExp(`^(0|${num_source}(${['deg', 'grad', 'rad', 'turn'].join('|')})?)$`, 'i');
const ang_source = ANGLE_REGEXP.source.slice(1, -1);

export const HSL_REGEXP = new RegExp(`^hsl\\(\\s*(${ang_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*\\)$`, 'i');
export const HSL_SPACE_REGEXP = new RegExp(`^hsl\\(\\s*(${ang_source})\\s+(${alf_source})\\s+(${alf_source})\\s*\\)$`, 'i');
export const HSLA_REGEXP = new RegExp(`^hsla\\(\\s*(${ang_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*\\)$`, 'i');
export const HSLA_SPACE_REGEXP = new RegExp(`^hsla\\(\\s*(${ang_source})\\s+(${alf_source})\\s+(${alf_source})\\s*/\\s*(${alf_source})\\s*\\)$`, 'i');
export const HSL_REGEXP_FULL = new RegExp(`^(${[HSL_REGEXP, HSL_SPACE_REGEXP, HSLA_REGEXP, HSLA_SPACE_REGEXP].map((regexp) => regexp.source.slice(1, -1)).join('|')})$`);

export const HWB_REGEXP = new RegExp(`^hwb\\(\\s*(${ang_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*\\)$`, 'i');
export const HWB_SPACE_REGEXP = new RegExp(`^hwb\\(\\s*(${ang_source})\\s+(${alf_source})\\s+(${alf_source})\\s*\\)$`, 'i');
export const HWBA_REGEXP = new RegExp(`^hwba\\(\\s*(${ang_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*,\\s*(${alf_source})\\s*\\)$`, 'i');
export const HWBA_SPACE_REGEXP = new RegExp(`^hwba\\(\\s*(${ang_source})\\s+(${alf_source})\\s+(${alf_source})\\s*/\\s*(${alf_source})\\s*\\)$`, 'i');
export const HWB_REGEXP_FULL = new RegExp(`^(${[HWB_REGEXP, HWB_SPACE_REGEXP, HWBA_REGEXP, HWBA_SPACE_REGEXP].map((regexp) => regexp.source.slice(1, -1)).join('|')})$`);

export const RGB_REGEXP = new RegExp(`^rgb\\(\\s*(${num_source})\\s*,\\s*(${num_source})\\s*,\\s*(${num_source})\\s*\\)$`, 'i');
export const RGB_SPACE_REGEXP = new RegExp(`^rgb\\(\\s*(${num_source})\\s+(${num_source})\\s+(${num_source})\\s*\\)$`, 'i');
export const RGBA_REGEXP = new RegExp(`^rgba\\(\\s*(${num_source})\\s*,\\s*(${num_source})\\s*,\\s*(${num_source})\\s*,\\s*(${alf_source})\\s*\\)$`, 'i');
export const RGBA_SPACE_REGEXP = new RegExp(`^rgba\\(\\s*(${num_source})\\s+(${num_source})\\s+(${num_source})\\s*/\\s*(${alf_source})\\s*\\)$`, 'i');
export const RGB_REGEXP_FULL = new RegExp(`^(${[RGB_REGEXP, RGB_SPACE_REGEXP, RGBA_REGEXP, RGBA_SPACE_REGEXP].map((regexp) => regexp.source.slice(1, -1)).join('|')})$`);

export const NAMES: { [key: string]: string } = {
    aliceblue: "#F0F8FF",
    antiquewhite: "#FAEBD7",
    aqua: "#0FF",
    aquamarine: "#7FFFD4",
    azure: "#F0FFFF",
    beige: "#F5F5DC",
    bisque: "#FFE4C4",
    black: "#000",
    blanchedalmond: "#FFEBCD",
    blue: "#00F",
    blueviolet: "#8A2BE2",
    brown: "#A52A2A",
    burlywood: "#DEB887",
    burntsienna: "#EA7E5D",
    cadetblue: "#5F9EA0",
    chartreuse: "#7FFF00",
    chocolate: "#D2691E",
    coral: "#FF7F50",
    cornflowerblue: "#6495ED",
    cornsilk: "#FFF8DC",
    crimson: "#DC143C",
    cyan: "#0FF",
    darkblue: "#00008B",
    darkcyan: "#008B8B",
    darkgoldenrod: "#B8860B",
    darkgray: "#A9A9A9",
    darkgreen: "#006400",
    darkgrey: "#A9A9A9",
    darkkhaki: "#BDB76B",
    darkmagenta: "#8B008B",
    darkolivegreen: "#556B2F",
    darkorange: "#FF8C00",
    darkorchid: "#9932CC",
    darkred: "#8B0000",
    darksalmon: "#E9967A",
    darkseagreen: "#8FBC8F",
    darkslateblue: "#483D8B",
    darkslategray: "#2F4F4F",
    darkslategrey: "#2F4F4F",
    darkturquoise: "#00CED1",
    darkviolet: "#9400D3",
    deeppink: "#FF1493",
    deepskyblue: "#00BFFF",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1E90FF",
    firebrick: "#B22222",
    floralwhite: "#FFFAF0",
    forestgreen: "#228B22",
    fuchsia: "#F0F",
    gainsboro: "#DCDCDC",
    ghostwhite: "#F8F8FF",
    gold: "#FFD700",
    goldenrod: "#DAA520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#ADFF2F",
    grey: "#808080",
    honeydew: "#F0FFF0",
    hotpink: "#FF69B4",
    indianred: "#CD5C5C",
    indigo: "#4B0082",
    ivory: "#FFFFF0",
    khaki: "#F0E68C",
    lavender: "#E6E6FA",
    lavenderblush: "#FFF0F5",
    lawngreen: "#7CFC00",
    lemonchiffon: "#FFFACD",
    lightblue: "#ADD8E6",
    lightcoral: "#F08080",
    lightcyan: "#E0FFFF",
    lightgoldenrodyellow: "#FAFAD2",
    lightgray: "#D3D3D3",
    lightgreen: "#90EE90",
    lightgrey: "#D3D3D3",
    lightpink: "#FFB6C1",
    lightsalmon: "#FFA07A",
    lightseagreen: "#20B2AA",
    lightskyblue: "#87CEFA",
    lightslategray: "#789",
    lightslategrey: "#789",
    lightsteelblue: "#B0C4DE",
    lightyellow: "#FFFFE0",
    lime: "#0F0",
    limegreen: "#32CD32",
    linen: "#FAF0E6",
    magenta: "#F0F",
    maroon: "#800000",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: "#BA55D3",
    mediumpurple: "#9370DB",
    mediumseagreen: "#3CB371",
    mediumslateblue: "#7B68EE",
    mediumspringgreen: "#00FA9A",
    mediumturquoise: "#48D1CC",
    mediumvioletred: "#C71585",
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: "#FFE4B5",
    navajowhite: "#FFDEAD",
    navy: "#000080",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    orange: "#FFA500",
    orangered: "#FF4500",
    orchid: "#DA70D6",
    palegoldenrod: "#EEE8AA",
    palegreen: "#98FB98",
    paleturquoise: "#AFEEEE",
    palevioletred: "#DB7093",
    papayawhip: "#FFEFD5",
    peachpuff: "#FFDAB9",
    peru: "#CD853F",
    pink: "#FFC0CB",
    plum: "#DDA0DD",
    powderblue: "#B0E0E6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#F00",
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    silver: "#C0C0C0",
    skyblue: "#87CEEB",
    slateblue: "#6A5ACD",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    teal: "#008080",
    thistle: "#D8BFD8",
    tomato: "#FF6347",
    turquoise: "#40E0D0",
    violet: "#EE82EE",
    wheat: "#F5DEB3",
    white: "#FFF",
    whitesmoke: "#F5F5F5",
    yellow: "#FF0",
    yellowgreen: "#9ACD32",
};

// Reversed key-value of NAMES
export const HEX_NAMES: { [key: string]: string } = Object.entries(NAMES).reduce((accu, [name, value]) => ({ ...accu, [value]: name }), {});
