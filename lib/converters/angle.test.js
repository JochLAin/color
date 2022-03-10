import dec, { PI, PIx2, roundAngleDegrees, roundAngleGradians, roundAngleRadians, roundAngleTurns } from "../utils/math";
import { grad2deg, rad2deg, turn2deg, deg2grad, rad2grad, turn2grad, deg2rad, grad2rad, turn2rad, deg2turn, rad2turn, grad2turn } from "./angle";

const DICT = [
    [0, 0, 0, 0],
    [45, 50, PI.div(4), 0.125],
    [60, dec(200).div(3), PI.div(3), dec(1).div(6)],
    [90, 100, PI.div(2), 0.25],
    [180, 200, PI, 0.5],
    [360, 400, PIx2, 1],
];

const testRoundedAngle = (roundMethod) => (expected, value) => {
    expect(roundMethod(value)).toBe(roundMethod(expected));
}

test('Test grad2deg', () => {
    const test = testRoundedAngle(roundAngleDegrees);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg, grad] = DICT[idx];
        test(deg, grad2deg(grad));
    }
});

test('Test rad2deg', () => {
    const test = testRoundedAngle(roundAngleDegrees);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg,, rad] = DICT[idx];
        test(deg, rad2deg(rad));
    }
});

test('Test turn2deg', () => {
    const test = testRoundedAngle(roundAngleDegrees);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg,,, turn] = DICT[idx];
        test(deg, turn2deg(turn));
    }
});

test('Test deg2grad', () => {
    const test = testRoundedAngle(roundAngleGradians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg, grad] = DICT[idx];
        test(grad, deg2grad(deg));
    }
});

test('Test rad2grad', () => {
    const test = testRoundedAngle(roundAngleGradians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [, grad, rad] = DICT[idx];
        test(grad, rad2grad(rad));
    }
});

test('Test turn2grad', () => {
    const test = testRoundedAngle(roundAngleGradians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [, grad,, turn] = DICT[idx];
        test(grad, turn2grad(turn));
    }
});

test('Test deg2rad', () => {
    const test = testRoundedAngle(roundAngleRadians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg,, rad] = DICT[idx];
        test(rad, deg2rad(deg));
    }
});

test('Test grad2rad', () => {
    const test = testRoundedAngle(roundAngleRadians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [, grad, rad] = DICT[idx];
        test(rad, grad2rad(grad));
    }
});

test('Test turn2rad', () => {
    const test = testRoundedAngle(roundAngleRadians);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [,, rad, turn] = DICT[idx];
        test(rad, turn2rad(turn));
    }
});

test('Test deg2turn', () => {
    const test = testRoundedAngle(roundAngleTurns);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [deg,,, turn] = DICT[idx];
        test(turn, deg2turn(deg));
    }
});

test('Test grad2turn', () => {
    const test = testRoundedAngle(roundAngleTurns);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [, grad,, turn] = DICT[idx];
        test(turn, grad2turn(grad));
    }
});

test('Test rad2turn', () => {
    const test = testRoundedAngle(roundAngleTurns);
    for (let idx = 0; idx < DICT.length; idx++) {
        const [,, rad, turn] = DICT[idx];
        test(turn, rad2turn(rad));
    }
});
