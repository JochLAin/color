import { INTEGER_REGEXP, NUMBER_REGEXP, PERCENTAGE_REGEXP, ALPHA_REGEXP } from "./constants";

test('Test RegExp INT', () => {
    expect(INTEGER_REGEXP.test('12')).toBe(true);
    expect(INTEGER_REGEXP.test('+123')).toBe(true);
    expect(INTEGER_REGEXP.test('-456')).toBe(true);
    expect(INTEGER_REGEXP.test('0')).toBe(true);
    expect(INTEGER_REGEXP.test('+0')).toBe(true);
    expect(INTEGER_REGEXP.test('-0')).toBe(true);

    expect(INTEGER_REGEXP.test('12.0')).toBe(false);
    expect(INTEGER_REGEXP.test('12.')).toBe(false);
    expect(INTEGER_REGEXP.test('+---12')).toBe(false);
    expect(INTEGER_REGEXP.test('ten')).toBe(false);
    expect(INTEGER_REGEXP.test(String.fromCharCode(0x4E94))).toBe(false);
});

test('Test RegExp NUMBER', () => {
    expect(NUMBER_REGEXP.test('0')).toBe(true);
    expect(NUMBER_REGEXP.test('12')).toBe(true);
    expect(NUMBER_REGEXP.test('4.01')).toBe(true);
    expect(NUMBER_REGEXP.test('-456.8')).toBe(true);
    expect(NUMBER_REGEXP.test('0.0')).toBe(true);
    expect(NUMBER_REGEXP.test('+0.0')).toBe(true);
    expect(NUMBER_REGEXP.test('-0.0')).toBe(true);
    expect(NUMBER_REGEXP.test('.60')).toBe(true);
    expect(NUMBER_REGEXP.test('10e3')).toBe(true);
    expect(NUMBER_REGEXP.test('-3.4e-2')).toBe(true);

    expect(NUMBER_REGEXP.test('12.')).toBe(false);
    expect(NUMBER_REGEXP.test('+-12.2')).toBe(false);
    expect(NUMBER_REGEXP.test('12.1.1')).toBe(false);
});

test('Test RegExp PERCENTAGE', () => {
    expect(PERCENTAGE_REGEXP.test('12%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('4.01%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('-456.8%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('0.0%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('+0.0%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('-0.0%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('.60%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('10e3%')).toBe(true);
    expect(PERCENTAGE_REGEXP.test('-3.4e-2%')).toBe(true);

    expect(PERCENTAGE_REGEXP.test('12')).toBe(false);
    expect(PERCENTAGE_REGEXP.test('12.%')).toBe(false);
    expect(PERCENTAGE_REGEXP.test('+-12.2%')).toBe(false);
    expect(PERCENTAGE_REGEXP.test('12.1.1%')).toBe(false);
});

test('Test RegExp ALPHA', () => {
    expect(ALPHA_REGEXP.test('0.1')).toBe(true);
    expect(ALPHA_REGEXP.test('10%')).toBe(true);

    expect(ALPHA_REGEXP.test('12 %')).toBe(false);
});
