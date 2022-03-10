import Decimal from "decimal.js";

type DecimalType = number|string|Decimal;

export default new Proxy(Decimal, {
    apply(target: any, thisArg: any, argArray: any[]): Decimal {
        return new Decimal(...argArray);
    },
});

const PRECISION = 10;
export const PI = Decimal.acos(-1);
export const PIx2 = PI.mul(2);

const MAX = 10 ** PRECISION;
const MIN = -MAX;

export const round = (value: DecimalType, max: DecimalType = MAX, modulo: boolean = false, min: DecimalType = MIN): Decimal => {
    if (!value) return String(0);

    value = Decimal(value);
    if (modulo) value = value.mod(max);
    if (modulo && value.lt(min)) value = value.add(max);
    if (value.gt(max)) value = Decimal(max);
    if (value.lt(min)) value = Decimal(min);

    const isLessThanHalf = Decimal.abs(value.mod(1)).lt(0.5);
    const isInEpsilonRange = Decimal.abs(value.mod(1).sub(0.5)).lt(Decimal(10).pow(-PRECISION));
    const roundMethod = (value.gt(0) && isLessThanHalf && !isInEpsilonRange)
        || (value.lt(0) && (isLessThanHalf || isInEpsilonRange))
        ? Decimal.ROUND_FLOOR
        : Decimal.ROUND_CEIL
    ;

    value = String(value.toDP(PRECISION, roundMethod));
    if (!modulo) return value;
    return String(Decimal(value).mod(max).toDP(PRECISION, roundMethod));
};

export const roundAngleDegrees = (value: DecimalType) => round(value, 360, true, 0);
export const roundAngleGradians = (value: DecimalType) => round(value, 400, true, 0);
export const roundAngleRadians = (value: DecimalType) => round(value, PIx2, true, 0);
export const roundAngleTurns = (value: DecimalType) => round(value, 1, true, 0);
export const roundChannel = (value: DecimalType) => round(value, 255, false, 0);
export const roundPercent = (value: DecimalType) => round(value, 100, false, 0);
