import Decimal, { P, PI, PI2 } from "../utils/math";

export const grad2deg = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 90).div(100).toPrecision(P)).mod(360);
export const rad2deg = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 180).div(PI).toPrecision(P)).mod(360);
export const turn2deg = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 360).toPrecision(P)).mod(360);

export const deg2grad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 100).div(90).toPrecision(P)).mod(400);
export const rad2grad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 200).div(PI).toPrecision(P)).mod(400);
export const turn2grad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, 400).toPrecision(P)).mod(400);

export const deg2rad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, PI).div(180).toPrecision(P)).mod(PI2.toPrecision(P));
export const grad2rad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, PI).div(200).toPrecision(P)).mod(PI2.toPrecision(P));
export const turn2rad = (value: number|string|Decimal) => Decimal(Decimal.mul(value, PI2).toPrecision(P)).mod(PI2.toPrecision(P));

export const deg2turn = (value: number|string|Decimal) => Decimal(Decimal.div(value, 360).toPrecision(P)).mod(1);
export const grad2turn = (value: number|string|Decimal) => Decimal(Decimal.div(value, 400).toPrecision(P)).mod(1);
export const rad2turn = (value: number|string|Decimal) => Decimal(Decimal.div(value, PI2).toPrecision(P)).mod(1);
