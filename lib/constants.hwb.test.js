import { HWB_REGEXP, HWB_SPACE_REGEXP, HWBA_REGEXP, HWBA_SPACE_REGEXP, HWB_REGEXP_FULL } from "./constants";

const reduceAngles = (angles) => angles.reduce((accu, value) => [...accu, `${value}`, ...['', 'deg', 'turn', 'rad', 'grad'].map((unit) => `${value}${unit}`)], []).filter((item, idx, items) => items.indexOf(item) === idx);
const VALID_HUES = reduceAngles([0, 180, -12.3e-4]);
const VALID_PERCENTS = ['10%', 0.1, '.1'];
const INVALID_HUES = reduceAngles([10, '', 'a']);
const INVALID_PERCENTS = [1, '', 'a'];

test('Test RegExp HWB', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                expect(HWB_REGEXP.test(`hwb(${hue},${white},${black})`)).toBe(true);
                expect(HWB_REGEXP.test(`hwb(${hue}, ${white}, ${black})`)).toBe(true);
                expect(HWB_REGEXP.test(`hwb(    ${hue}  ,  ${white}  ,   ${black}  )`)).toBe(true);
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((white, idx_white) => {
            INVALID_PERCENTS.forEach((black, idx_black) => {
                if (idx_hue >= 5 || idx_white || idx_black) {
                    expect(HWB_REGEXP.test(`hwb (${hue},${white},${black})`)).toBe(false);
                    expect(HWB_REGEXP.test(`hwb(${hue} ${white} ${black})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_white || idx_black || idx_alpha) {
                        expect(HWB_REGEXP.test(`hwb(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWB_REGEXP.test(`hwb(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(HWB_REGEXP.test(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWB_REGEXP.test(`hwba(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HWB_SPACE', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                expect(HWB_SPACE_REGEXP.test(`hwb(${hue} ${white} ${black})`)).toBe(true);
                expect(HWB_SPACE_REGEXP.test(`hwb(    ${hue}   ${white}    ${black}  )`)).toBe(true);
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((white, idx_white) => {
            INVALID_PERCENTS.forEach((black, idx_black) => {
                if (idx_hue >= 5 || idx_white || idx_black) {
                    expect(HWB_SPACE_REGEXP.test(`hwb (${hue} ${white} ${black})`)).toBe(false);
                    expect(HWB_SPACE_REGEXP.test(`hwb(${hue},${white},${black})`)).toBe(false);
                    expect(HWB_SPACE_REGEXP.test(`hwb(${hue}, ${white}, ${black})`)).toBe(false);
                    expect(HWB_SPACE_REGEXP.test(`hwb(   ${hue},     ${white},    ${black}    )`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_white || idx_black || idx_alpha) {
                        expect(HWB_SPACE_REGEXP.test(`hwb(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWB_SPACE_REGEXP.test(`hwb(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(HWB_SPACE_REGEXP.test(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWB_SPACE_REGEXP.test(`hwba(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HWBA', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(HWBA_REGEXP.test(`hwba(${hue},${white},${black},${alpha})`)).toBe(true);
                    expect(HWBA_REGEXP.test(`hwba(${hue}, ${white}, ${black}, ${alpha})`)).toBe(true);
                    expect(HWBA_REGEXP.test(`hwba(    ${hue}  ,  ${white}  ,   ${black}  ,   ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((white, idx_white) => {
            INVALID_PERCENTS.forEach((black, idx_black) => {
                if (idx_hue >= 5 || idx_white || idx_black) {
                    expect(HWBA_REGEXP.test(`hwb(${hue}, ${white}, ${black})`)).toBe(false);
                    expect(HWBA_REGEXP.test(`hwb(${hue}  ${white}  ${black})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_white || idx_black || idx_alpha) {
                        expect(HWBA_REGEXP.test(`hwb(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWBA_REGEXP.test(`hwb(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(HWBA_REGEXP.test(`hwba (${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(HWBA_REGEXP.test(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWBA_REGEXP.test(`hwba(${hue} ${white} ${black} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HWBA_SPACE', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(HWBA_SPACE_REGEXP.test(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(true);
                    expect(HWBA_SPACE_REGEXP.test(`hwba(${hue}  ${white}  ${black}  /  ${alpha})`)).toBe(true);
                    expect(HWBA_SPACE_REGEXP.test(`hwba(    ${hue}     ${white}      ${black}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((white, idx_white) => {
            INVALID_PERCENTS.forEach((black, idx_black) => {
                if (idx_hue >= 5 || idx_white || idx_black) {
                    expect(HWBA_SPACE_REGEXP.test(`hwb (${hue} ${white} ${black})`)).toBe(false);
                    expect(HWBA_SPACE_REGEXP.test(`hwb(${hue} ${white} ${black})`)).toBe(false);
                    expect(HWBA_SPACE_REGEXP.test(`hwb(${hue}  ${white}  ${black})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_white || idx_black || idx_alpha) {
                        expect(HWBA_SPACE_REGEXP.test(`hwb(${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWBA_SPACE_REGEXP.test(`hwb(${hue}, ${white}, ${black}, ${alpha})`)).toBe(false);
                        expect(HWBA_SPACE_REGEXP.test(`hwba (${hue} ${white} ${black} / ${alpha})`)).toBe(false);
                        expect(HWBA_SPACE_REGEXP.test(`hwba(${hue} ${white} ${black} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSLA_FULL', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((white) => {
            VALID_PERCENTS.forEach((black) => {
                expect(HWB_REGEXP_FULL.test(`hwb(${hue},${white},${black})`)).toBe(true);
                expect(HWB_REGEXP_FULL.test(`hwb(${hue}, ${white}, ${black})`)).toBe(true);
                expect(HWB_REGEXP_FULL.test(`hwb(    ${hue}  ,  ${white}  ,   ${black}  )`)).toBe(true);
                expect(HWB_REGEXP_FULL.test(`hwb(${hue} ${white} ${black})`)).toBe(true);
                expect(HWB_REGEXP_FULL.test(`hwb(    ${hue}   ${white}    ${black}  )`)).toBe(true);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(HWB_REGEXP_FULL.test(`hwba(${hue},${white},${black},${alpha})`)).toBe(true);
                    expect(HWB_REGEXP_FULL.test(`hwba(${hue}, ${white}, ${black}, ${alpha})`)).toBe(true);
                    expect(HWB_REGEXP_FULL.test(`hwba(    ${hue}  ,  ${white}  ,   ${black}  ,   ${alpha}  )`)).toBe(true);
                    expect(HWB_REGEXP_FULL.test(`hwba(${hue} ${white} ${black} / ${alpha})`)).toBe(true);
                    expect(HWB_REGEXP_FULL.test(`hwba(${hue}  ${white}  ${black}  /  ${alpha})`)).toBe(true);
                    expect(HWB_REGEXP_FULL.test(`hwba(    ${hue}     ${white}      ${black}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });
});
