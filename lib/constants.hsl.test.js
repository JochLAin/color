import { HSL_REGEXP, HSL_SPACE_REGEXP, HSLA_REGEXP, HSLA_SPACE_REGEXP, HSL_REGEXP_FULL } from "./constants";

const reduceAngles = (angles) => angles.reduce((accu, value) => [...accu, `${value}`, ...['', 'deg', 'turn', 'rad', 'grad'].map((unit) => `${value}${unit}`)], []).filter((item, idx, items) => items.indexOf(item) === idx);
const VALID_HUES = reduceAngles([0, 180, -12.3e-4]);
const VALID_PERCENTS = ['10%', 0.1, '.1'];
const INVALID_HUES = reduceAngles([10, '', 'a']);
const INVALID_PERCENTS = [1, '', 'a'];

test('Test RegExp HSL', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                expect(HSL_REGEXP.test(`hsl(${hue},${saturation},${lightness})`)).toBe(true);
                expect(HSL_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(true);
                expect(HSL_REGEXP.test(`hsl(    ${hue}  ,  ${saturation}  ,   ${lightness}  )`)).toBe(true);
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((saturation, idx_saturation) => {
            INVALID_PERCENTS.forEach((lightness, idx_lightness) => {
                if (idx_hue >= 5 || idx_saturation || idx_lightness) {
                    if (HSL_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness})`) === true) {
                        console.log(
                            INVALID_HUES, INVALID_PERCENTS,
                            idx_hue, idx_saturation, idx_lightness,
                            hue, saturation, lightness
                        );
                    }
                    expect(HSL_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(false);
                    expect(HSL_REGEXP.test(`hsl (${hue},${saturation},${lightness})`)).toBe(false);
                    expect(HSL_REGEXP.test(`hsl(${hue} ${saturation} ${lightness})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_saturation || idx_lightness || idx_alpha) {
                        expect(HSL_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(HSL_REGEXP.test(`hsl(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSL_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSL_REGEXP.test(`hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSL_SPACE', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                expect(HSL_SPACE_REGEXP.test(`hsl(${hue} ${saturation} ${lightness})`)).toBe(true);
                expect(HSL_SPACE_REGEXP.test(`hsl(    ${hue}   ${saturation}    ${lightness}  )`)).toBe(true);
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((saturation, idx_saturation) => {
            INVALID_PERCENTS.forEach((lightness, idx_lightness) => {
                if (idx_hue >= 5 || idx_saturation || idx_lightness) {
                    expect(HSL_SPACE_REGEXP.test(`hsl (${hue} ${saturation} ${lightness})`)).toBe(false);
                    expect(HSL_SPACE_REGEXP.test(`hsl(${hue},${saturation},${lightness})`)).toBe(false);
                    expect(HSL_SPACE_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(false);
                    expect(HSL_SPACE_REGEXP.test(`hsl(   ${hue},     ${saturation},    ${lightness}    )`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_saturation || idx_lightness || idx_alpha) {
                        expect(HSL_SPACE_REGEXP.test(`hsl(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSL_SPACE_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(HSL_SPACE_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSL_SPACE_REGEXP.test(`hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSLA', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(HSLA_REGEXP.test(`hsla(${hue},${saturation},${lightness},${alpha})`)).toBe(true);
                    expect(HSLA_REGEXP.test(`hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(true);
                    expect(HSLA_REGEXP.test(`hsla(    ${hue}  ,  ${saturation}  ,   ${lightness}  ,   ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((saturation, idx_saturation) => {
            INVALID_PERCENTS.forEach((lightness, idx_lightness) => {
                if (idx_hue >= 5 || idx_saturation || idx_lightness) {
                    expect(HSLA_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(false);
                    expect(HSLA_REGEXP.test(`hsl(${hue}  ${saturation}  ${lightness})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_saturation || idx_lightness || idx_alpha) {
                        expect(HSLA_REGEXP.test(`hsl(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSLA_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(HSLA_REGEXP.test(`hsla (${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(HSLA_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSLA_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSLA_SPACE', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(HSLA_SPACE_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(true);
                    expect(HSLA_SPACE_REGEXP.test(`hsla(${hue}  ${saturation}  ${lightness}  /  ${alpha})`)).toBe(true);
                    expect(HSLA_SPACE_REGEXP.test(`hsla(    ${hue}     ${saturation}      ${lightness}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_HUES.forEach((hue, idx_hue) => {
        INVALID_PERCENTS.forEach((saturation, idx_saturation) => {
            INVALID_PERCENTS.forEach((lightness, idx_lightness) => {
                if (idx_hue >= 5 || idx_saturation || idx_lightness) {
                    expect(HSLA_SPACE_REGEXP.test(`hsl (${hue} ${saturation} ${lightness})`)).toBe(false);
                    expect(HSLA_SPACE_REGEXP.test(`hsl(${hue} ${saturation} ${lightness})`)).toBe(false);
                    expect(HSLA_SPACE_REGEXP.test(`hsl(${hue}  ${saturation}  ${lightness})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_hue >= 5 || idx_saturation || idx_lightness || idx_alpha) {
                        expect(HSLA_SPACE_REGEXP.test(`hsl(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSLA_SPACE_REGEXP.test(`hsl(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(false);
                        expect(HSLA_SPACE_REGEXP.test(`hsla (${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(false);
                        expect(HSLA_SPACE_REGEXP.test(`hsla(${hue} ${saturation} ${lightness} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSLA_FULL', () => {
    VALID_HUES.forEach((hue) => {
        VALID_PERCENTS.forEach((saturation) => {
            VALID_PERCENTS.forEach((lightness) => {
                expect(HSL_REGEXP_FULL.test(`hsl(${hue},${saturation},${lightness})`)).toBe(true);
                expect(HSL_REGEXP_FULL.test(`hsl(${hue}, ${saturation}, ${lightness})`)).toBe(true);
                expect(HSL_REGEXP_FULL.test(`hsl(    ${hue}  ,  ${saturation}  ,   ${lightness}  )`)).toBe(true);
                expect(HSL_REGEXP_FULL.test(`hsl(${hue} ${saturation} ${lightness})`)).toBe(true);
                expect(HSL_REGEXP_FULL.test(`hsl(    ${hue}   ${saturation}    ${lightness}  )`)).toBe(true);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(HSL_REGEXP_FULL.test(`hsla(${hue},${saturation},${lightness},${alpha})`)).toBe(true);
                    expect(HSL_REGEXP_FULL.test(`hsla(${hue}, ${saturation}, ${lightness}, ${alpha})`)).toBe(true);
                    expect(HSL_REGEXP_FULL.test(`hsla(    ${hue}  ,  ${saturation}  ,   ${lightness}  ,   ${alpha}  )`)).toBe(true);
                    expect(HSL_REGEXP_FULL.test(`hsla(${hue} ${saturation} ${lightness} / ${alpha})`)).toBe(true);
                    expect(HSL_REGEXP_FULL.test(`hsla(${hue}  ${saturation}  ${lightness}  /  ${alpha})`)).toBe(true);
                    expect(HSL_REGEXP_FULL.test(`hsla(    ${hue}     ${saturation}      ${lightness}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });
});
