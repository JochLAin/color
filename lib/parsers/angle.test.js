import { roundAngleDegrees } from "../utils/math";
import parse from "./angle";

const run = (value, expected) => {
    expect(roundAngleDegrees(parse(value))).toBe(roundAngleDegrees(expected));
}

test('Test parse without unit', () => {
    run(0, 0);
    run(30, 30);
    run(45, 45);
    run(60, 60);
    run(90, 90);
    run(180, 180);
    run(360, 0);
});

test('Test parse with unit deg', () => {
    run('0deg', 0);
    run('30deg', 30);
    run('45deg', 45);
    run('60deg', 60);
    run('90deg', 90);
    run('180deg', 180);
    run('360deg', 0);
});

test('Test parse with unit °', () => {
    run('0°', 0);
    run('30°', 30);
    run('45°', 45);
    run('60°', 60);
    run('90°', 90);
    run('180°', 180);
    run('360°', 0);
});

test('Test parse with unit rad', () => {
    run('0rad', 0);
    run('0.52359877559829887307710723054658rad', 30);
    run('0.78539816339744830961566084581988rad', 45);
    run('1.0471975511965977461542144610932rad', 60);
    run('1.5707963267948966192313216916398rad', 90);
    run('3.1415926535897932384626433832795rad', 180);
    run('6.283185307179586476925286766559rad', 0);
});

test('Test parse with unit grad', () => {
    run('0grad', 0);
    run('33.33333333333333333333333333grad', 30);
    run('50grad', 45);
    run('66.66666666666666666666666666grad', 60);
    run('100grad', 90);
    run('200grad', 180);
    run('400grad', 0);
});

test('Test parse with unit turn', () => {
    run('0turn', 0);
    run('0.0833333333333333333333333turn', 30);
    run('0.125turn', 45);
    run('0.1666666666666666666666666turn', 60);
    run('0.25turn', 90);
    run('0.5turn', 180);
    run('1turn', 0);
});
