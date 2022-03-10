import { ANGLE_REGEXP, ANGLE_DEG_REGEX, ANGLE_GRAD_REGEX, ANGLE_RAD_REGEX, ANGLE_TURN_REGEX } from "../constants";
import { grad2deg, rad2deg, turn2deg } from "../converters/angle";
import Decimal, { DecimalType } from "../utils/math";

export default (value: undefined|DecimalType): string => {
    if (!ANGLE_REGEXP.test(value)) throw new Error(`Invalid <angle> => ${value}`);
    if (!value) return String(0);

    const rad_match = String(value).match(ANGLE_RAD_REGEX);
    if (rad_match) return rad2deg(rad_match[1]);

    const grad_match = String(value).match(ANGLE_GRAD_REGEX);
    if (grad_match) return grad2deg(grad_match[1]);

    const turn_match = String(value).match(ANGLE_TURN_REGEX);
    if (turn_match) return turn2deg(turn_match[1]);

    const deg_match = String(value).match(ANGLE_DEG_REGEX);
    if (deg_match) return Decimal(deg_match[1]).mod(360);
};
