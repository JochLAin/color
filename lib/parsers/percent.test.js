import { roundPercent } from "../utils/math";
import parse from "./percent";

const run = (value, expected) => {
    expect(roundPercent(parse(value))).toBe(roundPercent(expected));
}

test('Test parse with unit', () => {
    run('-10%', 0);
    run('0%', 0);
    run('20%', 20);
    run('100%', 100);
    run('120%', 100);
});

test('Test parse without unit', () => {
    expect(() => parse('-10')).toThrow();
    expect(() => parse('0')).toThrow();
    expect(() => parse('20')).toThrow();
    expect(() => parse('100')).toThrow();
    expect(() => parse('120')).toThrow();
});
