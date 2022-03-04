import { isHSL } from "./testers";

const reduceAngles = (angles) => angles.reduce((accu, value) => [...accu, `${value}`, ...['', 'deg', 'turn', 'rad', 'grad'].map((unit) => `${value}${unit}`)], []).filter((item, idx, items) => items.indexOf(item) === idx);
const VALID_HUES = reduceAngles([0, 180, -12.3e-4]);
const VALID_PERCENTS = ['10%', 0.1, '.1'];
const INVALID_HUES = [...reduceAngles([10, '', 'a']), '10%'];
const INVALID_PERCENTS = [1, '', 'a'];

test('Test hsl tester', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                expect(isHSL(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(true);
                expect(isHSL(`hsl(${hue} ${saturation} ${lightness})`)).toBe(true);
                expect(isHSL({ hue, saturation, lightness })).toBe(true);
                expect(isHSL({ h: hue, s: saturation, l: lightness })).toBe(true);
                expect(isHSL([hue, saturation, lightness])).toBe(true);

                expect(isHSL({ hue, s: saturation, l: lightness })).toBe(false);
                expect(isHSL({ h: hue, saturation, l: lightness })).toBe(false);
                expect(isHSL({ h: hue, s: saturation, lightness })).toBe(false);
                expect(isHSL([hue, saturation])).toBe(false);
                expect(isHSL([hue])).toBe(false);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(isHSL(`hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(true);
                    expect(isHSL(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(true);
                    expect(isHSL({ hue, saturation, lightness, alpha })).toBe(true);
                    expect(isHSL({ h: hue, s: saturation, l: lightness, a: alpha })).toBe(true);
                    expect(isHSL([hue, saturation, lightness, alpha])).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((saturation, idx_saturation) => {
            INVALID_PERCENTS.forEach((lightness, idx_lightness) => {
                if (idx_hue >= 5 || idx_saturation || idx_lightness) {
                    expect(isHSL(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(false);
                    expect(isHSL(`hsl(${hue} ${saturation} ${lightness})`)).toBe(false);
                    expect(isHSL({ hue, saturation, lightness })).toBe(false);
                    expect(isHSL({ h: hue, s: saturation, l: lightness })).toBe(false);
                    expect(isHSL([hue, saturation, lightness])).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_saturation || idx_lightness || idx_alpha) {
                        expect(isHSL(`hsl(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(isHSL(`hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(isHSL(`hsla (${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(isHSL(`hsla(${hue} ${saturation} ${lightness} ${alpha})`)).toBe(false);
                        expect(isHSL({ hue, saturation, lightness, alpha })).toBe(false);
                        expect(isHSL({ h: hue, s: saturation, l: lightness, a: alpha })).toBe(false);
                        expect(isHSL([hue, saturation, lightness, alpha])).toBe(false);
                    }
                });
            });
        });
    });
});
