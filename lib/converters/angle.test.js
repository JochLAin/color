import Decimal from "decimal.js";
import { grad2deg, rad2deg, turn2deg, deg2grad, rad2grad, turn2grad, deg2rad, grad2rad, turn2rad, deg2turn, rad2turn, grad2turn } from "./angle";

const PI = Decimal.acos(-1);
const _val = (dec) => Number(dec.toSignificantDigits(10));
const _round = (val) => Number(new Decimal(val).toSignificantDigits(10));

test('Test grad2deg', () => {
    expect(_val(grad2deg(0))).toBe(0);
    expect(_val(grad2deg(50))).toBe(45);
    expect(_val(grad2deg(2/3 * 100))).toBe(60);
    expect(_val(grad2deg(100))).toBe(90);
    expect(_val(grad2deg(200))).toBe(180);
    expect(_val(grad2deg(400))).toBe(0);
});

test('Test rad2deg', () => {
    expect(_val(rad2deg(0))).toBe(0);
    expect(_val(rad2deg(Math.PI / 4))).toBe(45);
    expect(_val(rad2deg(Math.PI / 3))).toBe(60);
    expect(_val(rad2deg(Math.PI / 2))).toBe(90);
    expect(_val(rad2deg(Math.PI))).toBe(180);
    expect(_val(rad2deg(2 * Math.PI))).toBe(0);
});

test('Test turn2deg', () => {
    expect(_val(turn2deg(0))).toBe(0);
    expect(_val(turn2deg(1/8))).toBe(45);
    expect(_val(turn2deg(1/6))).toBe(60);
    expect(_val(turn2deg(1/4))).toBe(90);
    expect(_val(turn2deg(1/2))).toBe(180);
    expect(_val(turn2deg(1))).toBe(0);
});

test('Test deg2grad', () => {
    expect(_val(deg2grad(0))).toBe(0);
    expect(_val(deg2grad(45))).toBe(50);
    expect(_val(deg2grad(60))).toBe(_round(200/3));
    expect(_val(deg2grad(90))).toBe(100);
    expect(_val(deg2grad(180))).toBe(200);
    expect(_val(deg2grad(360))).toBe(0);
});

test('Test deg2rad', () => {
    expect(_val(deg2rad(0))).toBe(0);
    expect(_val(deg2rad(45))).toBe(_val(PI.div(4)));
    expect(_val(deg2rad(60))).toBe(_val(PI.div(3)));
    expect(_val(deg2rad(90))).toBe(_val(PI.div(2)));
    expect(_val(deg2rad(180))).toBe(_val(PI));
    expect(_val(deg2rad(360))).toBe(0);
});
