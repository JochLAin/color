import { roundChannel } from "../utils/math";
import parse from "./channel";

const run = (value, expected) => {
    expect(roundChannel(parse(value))).toBe(roundChannel(expected));
}

test('Test parse', () => {
    run('-10', 0);
    run('0', 0);
    run('20', 20);
    run('100', 100);
    run('255', 255);
    run('300', 255);
});
