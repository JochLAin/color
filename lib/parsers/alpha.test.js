import { roundPercent } from "../utils/math";
import parse from "./alpha";

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
    run(-1, 0);
    run(0, 0);
    run(0.2, 20);
    run(1, 100);
    run(1.2, 100);
});
