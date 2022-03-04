import { isHWB } from "./testers";

const reduceAngles = (angles) => angles.reduce((accu, value) => [...accu, `${value}`, ...['', 'deg', 'turn', 'rad', 'grad'].map((unit) => `${value}${unit}`)], []).filter((item, idx, items) => items.indexOf(item) === idx);
const VALID_HUES = reduceAngles([0, 180, -12.3e-4]);
const VALID_PERCENTS = ['10%', 0.1, '.1'];
const INVALID_HUES = [...reduceAngles([10, '', 'a']), '10%'];
const INVALID_PERCENTS = [1, '', 'a'];

test('Test hwb tester', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                expect(isHWB(`hwb(${hue}, ${white}, ${black})`)).toBe(true);
                expect(isHWB(`hwb(${hue} ${white} ${black})`)).toBe(true);
                expect(isHWB({ hue, white, black })).toBe(true);
                expect(isHWB({ h: hue, w: white, b: black })).toBe(true);
                expect(isHWB([hue, white, black])).toBe(true);

                expect(isHWB({ hue, w: white, b: black })).toBe(false);
                expect(isHWB({ h: hue, white, b: black })).toBe(false);
                expect(isHWB({ h: hue, w: white, black })).toBe(false);
                expect(isHWB([hue, white])).toBe(false);
                expect(isHWB([hue])).toBe(false);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(isHWB(`hwba(${hue}, ${white}, ${black}, ${alpha})`)).toBe(true);
                    expect(isHWB(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(true);
                    expect(isHWB({ hue, white, black, alpha })).toBe(true);
                    expect(isHWB({ h: hue, w: white, b: black, a: alpha })).toBe(true);
                    expect(isHWB([hue, white, black, alpha])).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((white, idx_white) => {
            INVALID_PERCENTS.forEach((black, idx_black) => {
                if (idx_hue >= 5 || idx_white || idx_black) {
                    expect(isHWB(`hwb(${hue}, ${white}, ${black})`)).toBe(false);
                    expect(isHWB(`hwb(${hue} ${white} ${black})`)).toBe(false);
                    expect(isHWB({ hue, white, black })).toBe(false);
                    expect(isHWB({ h: hue, w: white, b: black })).toBe(false);
                    expect(isHWB([hue, white, black])).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_white || idx_black || idx_alpha) {
                        expect(isHWB(`hwb(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(isHWB(`hwb(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(isHWB(`hwba (${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(isHWB(`hwba(${hue} ${white} ${black} ${alpha})`)).toBe(false);
                        expect(isHWB({ hue, white, black, alpha })).toBe(false);
                        expect(isHWB({ h: hue, w: white, b: black, a: alpha })).toBe(false);
                        expect(isHWB([hue, white, black, alpha])).toBe(false);
                    }
                });
            });
        });
    });
});
