import { RGB_REGEXP, RGB_SPACE_REGEXP, RGBA_REGEXP, RGBA_SPACE_REGEXP, RGB_REGEXP_FULL } from "./constants";

const VALID_CHANNELS = [0, 180, -12.3e-4];
const VALID_PERCENTS = ['10%', 0.1, '.1'];

const INVALID_CHANNELS = [10, '', 'a'];
const INVALID_PERCENTS = [1, '', 'a'];

test('Test RegExp RGB', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((blue) => {
            VALID_CHANNELS.forEach((green) => {
                expect(RGB_REGEXP.test(`rgb(${red},${blue},${green})`)).toBe(true);
                expect(RGB_REGEXP.test(`rgb(${red}, ${blue}, ${green})`)).toBe(true);
                expect(RGB_REGEXP.test(`rgb(    ${red}  ,  ${blue}  ,   ${green}  )`)).toBe(true);
            });
        });
    });

    INVALID_CHANNELS.forEach((red, idx_red) => {
        INVALID_CHANNELS.forEach((blue, idx_blue) => {
            INVALID_CHANNELS.forEach((green, idx_green) => {
                if (idx_red || idx_blue || idx_green) {
                    expect(RGB_REGEXP.test(`rgb (${red},${blue},${green})`)).toBe(false);
                    expect(RGB_REGEXP.test(`rgb(${red} ${blue} ${green})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_red || idx_blue || idx_green || idx_alpha) {
                        expect(RGB_REGEXP.test(`rgb(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGB_REGEXP.test(`rgb(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                        expect(RGB_REGEXP.test(`rgba(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGB_REGEXP.test(`rgba(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp RGB_SPACE', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((blue) => {
            VALID_CHANNELS.forEach((green) => {
                expect(RGB_SPACE_REGEXP.test(`rgb(${red} ${blue} ${green})`)).toBe(true);
                expect(RGB_SPACE_REGEXP.test(`rgb(    ${red}   ${blue}    ${green}  )`)).toBe(true);
            });
        });
    });

    INVALID_CHANNELS.forEach((red, idx_red) => {
        INVALID_CHANNELS.forEach((blue, idx_blue) => {
            INVALID_CHANNELS.forEach((green, idx_green) => {
                if (idx_red || idx_blue || idx_green) {
                    expect(RGB_SPACE_REGEXP.test(`rgb (${red} ${blue} ${green})`)).toBe(false);
                    expect(RGB_SPACE_REGEXP.test(`rgb(${red},${blue},${green})`)).toBe(false);
                    expect(RGB_SPACE_REGEXP.test(`rgb(${red}, ${blue}, ${green})`)).toBe(false);
                    expect(RGB_SPACE_REGEXP.test(`rgb(   ${red},     ${blue},    ${green}    )`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_red || idx_blue || idx_green || idx_alpha) {
                        expect(RGB_SPACE_REGEXP.test(`rgb(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGB_SPACE_REGEXP.test(`rgb(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                        expect(RGB_SPACE_REGEXP.test(`rgba(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGB_SPACE_REGEXP.test(`rgba(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp RGBA', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((blue) => {
            VALID_CHANNELS.forEach((green) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(RGBA_REGEXP.test(`rgba(${red},${blue},${green},${alpha})`)).toBe(true);
                    expect(RGBA_REGEXP.test(`rgba(${red}, ${blue}, ${green}, ${alpha})`)).toBe(true);
                    expect(RGBA_REGEXP.test(`rgba(    ${red}  ,  ${blue}  ,   ${green}  ,   ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_CHANNELS.forEach((red, idx_red) => {
        INVALID_CHANNELS.forEach((blue, idx_blue) => {
            INVALID_CHANNELS.forEach((green, idx_green) => {
                if (idx_red || idx_blue || idx_green) {
                    expect(RGBA_REGEXP.test(`rgb(${red}, ${blue}, ${green})`)).toBe(false);
                    expect(RGBA_REGEXP.test(`rgb(${red}  ${blue}  ${green})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_red || idx_blue || idx_green || idx_alpha) {
                        expect(RGBA_REGEXP.test(`rgb(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGBA_REGEXP.test(`rgb(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                        expect(RGBA_REGEXP.test(`rgba (${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                        expect(RGBA_REGEXP.test(`rgba(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGBA_REGEXP.test(`rgba(${red} ${blue} ${green} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp RGBA_SPACE', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((blue) => {
            VALID_CHANNELS.forEach((green) => {
                VALID_PERCENTS.forEach((alpha) => {
                    expect(RGBA_SPACE_REGEXP.test(`rgba(${red} ${blue} ${green} / ${alpha})`)).toBe(true);
                    expect(RGBA_SPACE_REGEXP.test(`rgba(${red}  ${blue}  ${green}  /  ${alpha})`)).toBe(true);
                    expect(RGBA_SPACE_REGEXP.test(`rgba(    ${red}     ${blue}      ${green}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });

    INVALID_CHANNELS.forEach((red, idx_red) => {
        INVALID_CHANNELS.forEach((blue, idx_blue) => {
            INVALID_CHANNELS.forEach((green, idx_green) => {
                if (idx_red || idx_blue || idx_green) {
                    expect(RGBA_SPACE_REGEXP.test(`rgb (${red} ${blue} ${green})`)).toBe(false);
                    expect(RGBA_SPACE_REGEXP.test(`rgb(${red} ${blue} ${green})`)).toBe(false);
                    expect(RGBA_SPACE_REGEXP.test(`rgb(${red}  ${blue}  ${green})`)).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_red || idx_blue || idx_green || idx_alpha) {
                        expect(RGBA_SPACE_REGEXP.test(`rgb(${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGBA_SPACE_REGEXP.test(`rgb(${red}, ${blue}, ${green}, ${alpha})`)).toBe(false);
                        expect(RGBA_SPACE_REGEXP.test(`rgba (${red} ${blue} ${green} / ${alpha})`)).toBe(false);
                        expect(RGBA_SPACE_REGEXP.test(`rgba(${red} ${blue} ${green} ${alpha})`)).toBe(false);
                    }
                });
            });
        });
    });
});

test('Test RegExp HSLA_FULL', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((blue) => {
            VALID_CHANNELS.forEach((green) => {
                expect(RGB_REGEXP_FULL.test(`rgb(${red},${blue},${green})`)).toBe(true);
                expect(RGB_REGEXP_FULL.test(`rgb(${red}, ${blue}, ${green})`)).toBe(true);
                expect(RGB_REGEXP_FULL.test(`rgb(    ${red}  ,  ${blue}  ,   ${green}  )`)).toBe(true);
                expect(RGB_REGEXP_FULL.test(`rgb(${red} ${blue} ${green})`)).toBe(true);
                expect(RGB_REGEXP_FULL.test(`rgb(    ${red}   ${blue}    ${green}  )`)).toBe(true);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(RGB_REGEXP_FULL.test(`rgba(${red},${blue},${green},${alpha})`)).toBe(true);
                    expect(RGB_REGEXP_FULL.test(`rgba(${red}, ${blue}, ${green}, ${alpha})`)).toBe(true);
                    expect(RGB_REGEXP_FULL.test(`rgba(    ${red}  ,  ${blue}  ,   ${green}  ,   ${alpha}  )`)).toBe(true);
                    expect(RGB_REGEXP_FULL.test(`rgba(${red} ${blue} ${green} / ${alpha})`)).toBe(true);
                    expect(RGB_REGEXP_FULL.test(`rgba(${red}  ${blue}  ${green}  /  ${alpha})`)).toBe(true);
                    expect(RGB_REGEXP_FULL.test(`rgba(    ${red}     ${blue}      ${green}  /  ${alpha}  )`)).toBe(true);
                });
            });
        });
    });
});
