import {ANGLE_DEG_REGEX, ANGLE_RAD_REGEX, ANGLE_GRAD_REGEX, ANGLE_TURN_REGEX, PERCENTAGE_REGEXP} from "./constants";
import { rad2deg, grad2deg, turn2deg } from "./converters/angle";
import { CMYK_OBJECT, HWB_OBJECT, HSL_OBJECT, RGB_OBJECT } from "./types";
import { round } from "./utils";

function _alpha(value: string|number|undefined): number {
    return round(value === undefined ? 1 : value);
}

function _angle(value: number|string|undefined): number|string {
    if (!value) return 0;

    const deg_match = String(value).match(ANGLE_DEG_REGEX);
    if (deg_match) value = Number(deg_match[1]);
    const rad_match = String(value).match(ANGLE_RAD_REGEX);
    if (rad_match) value = rad2deg(Number(rad_match[1]));
    const grad_match = String(value).match(ANGLE_GRAD_REGEX);
    if (grad_match) value = grad2deg(Number(grad_match[1]));
    const turn_match = String(value).match(ANGLE_TURN_REGEX);
    if (turn_match) value = turn2deg(Number(turn_match[1]));

    return round(value, 360, true);
}

function _channel(value: string|number|undefined): number {
    if (!value) return 0;
    return round(value, 255);
}

function _percent(value: string|number|undefined): number {
    if (!value) return 0;
    const per_match = String(value).match(PERCENTAGE_REGEXP);
    if (per_match) value = Number(per_match[1]);

    return round(value, 100);
}

export {
    _alpha as normalizeAlpha,
    _angle as normalizeAngle,
    _channel as normalizeChannel,
    _percent as normalizePercent,
};

export function normalizeCMYK(cmyk: CMYK_OBJECT): CMYK_OBJECT {
    return {
        cyan: _percent(cmyk.cyan),
        magenta: _percent(cmyk.magenta),
        yellow: _percent(cmyk.yellow),
        black: _percent(cmyk.black),
        alpha: _alpha(cmyk.alpha),
    };
}

export function normalizeHWB(hwb: HWB_OBJECT): HWB_OBJECT {
    return {
        hue: _angle(hwb.hue),
        white: _percent(hwb.white),
        black: _percent(hwb.black),
        alpha: _alpha(hwb.alpha),
    };
}

export function normalizeHSL(hsl: HSL_OBJECT): HSL_OBJECT {
    return {
        hue: _angle(hsl.hue),
        saturation: _percent(hsl.saturation),
        lightness: _percent(hsl.lightness),
        alpha: _alpha(hsl.alpha),
    };
}

export function normalizeRGB(rgb: RGB_OBJECT): RGB_OBJECT {
    return {
        red: _channel(rgb.red),
        blue: _channel(rgb.blue),
        green: _channel(rgb.green),
        alpha: _alpha(rgb.alpha),
    };
}
