import { isHEX } from "./testers";

test('Test HEX tester', () => {
    const VALUES = ['#123', '#ABC', '#1234', '#123456', '#123ABC', '#123ABCFF'];
    for (let idx = 0; idx < VALUES.length; idx++) {
        const value = VALUES[idx];
        expect(isHEX(value)).toBe(true);
        expect(isHEX({ hex: value })).toBe(true);
        expect(isHEX({ hex: value, alpha: 100 })).toBe(true);
        expect(isHEX({ h: value })).toBe(true);
        expect(isHEX({ h: value, a: 100 })).toBe(true);
        expect(isHEX([value])).toBe(true);
        expect(isHEX([value, 100])).toBe(true);

        expect(isHEX({ hexa: value })).toBe(false);
    }
});
