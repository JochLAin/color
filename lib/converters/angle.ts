import Decimal, { PI, PIx2, DecimalType } from "../utils/math";

export const grad2deg = (value: DecimalType) => Decimal.mul(value, 90).div(100).mod(360);
export const rad2deg = (value: DecimalType) => Decimal.mul(value, 180).div(PI).mod(360);
export const turn2deg = (value: DecimalType) => Decimal.mul(value, 360).mod(360);

export const deg2grad = (value: DecimalType) => Decimal.mul(value, 100).div(90).mod(400);
export const rad2grad = (value: DecimalType) => Decimal.mul(value, 200).div(PI).mod(400);
export const turn2grad = (value: DecimalType) => Decimal.mul(value, 400).mod(400);

export const deg2rad = (value: DecimalType) => Decimal.mul(value, PI).div(180).mod(PIx2);
export const grad2rad = (value: DecimalType) => Decimal.mul(value, PI).div(200).mod(PIx2);
export const turn2rad = (value: DecimalType) => Decimal.mul(value, PIx2).mod(PIx2);

export const deg2turn = (value: DecimalType) => Decimal.div(value, 360).mod(1);
export const grad2turn = (value: DecimalType) => Decimal.div(value, 400).mod(1);
export const rad2turn = (value: DecimalType) => Decimal.div(value, PIx2).mod(1);
