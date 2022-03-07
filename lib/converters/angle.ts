import { round } from "../utils";

const RATIO_GRAD_DEG = 90 / 100;
const RATIO_RAD_DEG = 180 / Math.PI;
const RATIO_TURN_DEG = 360;

const RATIO_DEG_RAD = RATIO_GRAD_DEG ** -1;
const RATIO_GRAD_RAD = Math.PI / 200;
const RATIO_TURN_RAD = Math.PI * 2;

const RATIO_DEG_GRAD = RATIO_GRAD_DEG ** -1;
const RATIO_RAD_GRAD = RATIO_GRAD_RAD ** -1;
const RATIO_TURN_GRAD = 400;

const RATIO_DEG_TURN = RATIO_TURN_DEG ** -1;
const RATIO_RAD_TURN = RATIO_TURN_RAD ** -1;
const RATIO_GRAD_TURN = RATIO_TURN_GRAD ** -1;

export const grad2deg = (value: number) => round(value * RATIO_GRAD_DEG, 360.0, true);
export const rad2deg = (value: number) => round(value * RATIO_RAD_DEG, 360.0, true);
export const turn2deg = (value: number) => round(value * RATIO_TURN_DEG, 360.0, true);

export const deg2rad = (value: number) => round(value * RATIO_DEG_RAD, Math.PI * 2, true);
export const grad2rad = (value: number) => round(value * RATIO_GRAD_RAD, Math.PI * 2, true);
export const turn2rad = (value: number) => round(value * RATIO_TURN_RAD, Math.PI * 2, true);

export const deg2grad = (value: number) => round(value * RATIO_DEG_GRAD, 400.0, true);
export const rad2grad = (value: number) => round(value * RATIO_RAD_GRAD, 400.0, true);
export const turn2grad = (value: number) => round(value * RATIO_TURN_GRAD, 400.0, true);

export const deg2turn = (value: number) => round(value * RATIO_DEG_TURN, 1.0, true);
export const rad2turn = (value: number) => round(value * RATIO_RAD_TURN, 1.0, true);
export const grad2turn = (value: number) => round(value * RATIO_GRAD_TURN, 1.0, true);
