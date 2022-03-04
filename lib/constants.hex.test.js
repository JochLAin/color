import { HEX_REGEXP } from "./constants";

test('Test RegExp HEX', () => {
    expect(HEX_REGEXP.test('#123')).toBe(true);
    expect(HEX_REGEXP.test('#ABC')).toBe(true);
    expect(HEX_REGEXP.test('#1234')).toBe(true);
    expect(HEX_REGEXP.test('#123456')).toBe(true);
    expect(HEX_REGEXP.test('#123ABC')).toBe(true);
    expect(HEX_REGEXP.test('#123ABCFF')).toBe(true);

    expect(HEX_REGEXP.test('#12345')).toBe(false);
    expect(HEX_REGEXP.test('#1234567')).toBe(false);
    expect(HEX_REGEXP.test('#123456789')).toBe(false);
    expect(HEX_REGEXP.test('#GTH')).toBe(false);
    expect(HEX_REGEXP.test('#ABCGHI')).toBe(false);
    expect(HEX_REGEXP.test('#ABCGHIFF')).toBe(false);
});
