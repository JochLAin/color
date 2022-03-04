import { isRGB } from "./testers";

const VALID_CHANNELS = [0, 180, -12.3e-4];
const VALID_PERCENTS = ['10%', 0.1, '.1'];

const INVALID_CHANNELS = [10, '', 'a'];
const INVALID_PERCENTS = [1, '', 'a'];

test('Test rgb tester', () => {
    VALID_CHANNELS.forEach((red) => {
        VALID_CHANNELS.forEach((green) => {
            VALID_CHANNELS.forEach((blue) => {
                expect(isRGB(`rgb(${red}, ${green}, ${blue})`)).toBe(true);
                expect(isRGB(`rgb(${red} ${green} ${blue})`)).toBe(true);
                expect(isRGB({ red, green, blue })).toBe(true);
                expect(isRGB({ r: red, g: green, b: blue })).toBe(true);
                expect(isRGB([red, green, blue])).toBe(true);

                expect(isRGB({ red, g: green, b: blue })).toBe(false);
                expect(isRGB({ r: red, green, b: blue })).toBe(false);
                expect(isRGB({ r: red, g: green, blue })).toBe(false);
                expect(isRGB([red, green])).toBe(false);
                expect(isRGB([red])).toBe(false);

                VALID_PERCENTS.forEach((alpha) => {
                    expect(isRGB(`rgba(${red}, ${green}, ${blue}, ${alpha})`)).toBe(true);
                    expect(isRGB(`rgba(${red} ${green} ${blue} / ${alpha})`)).toBe(true);
                    expect(isRGB({ red, green, blue, alpha })).toBe(true);
                    expect(isRGB({ r: red, g: green, b: blue, a: alpha })).toBe(true);
                    expect(isRGB([red, green, blue, alpha])).toBe(true);
                });
            });
        });
    });

    INVALID_CHANNELS.forEach((red, idx_red) => {
        INVALID_CHANNELS.forEach((green, idx_green) => {
            INVALID_CHANNELS.forEach((blue, idx_blue) => {
                if (idx_red >= 5 || idx_green || idx_blue) {
                    expect(isRGB(`rgb(${red}, ${green}, ${blue})`)).toBe(false);
                    expect(isRGB(`rgb(${red} ${green} ${blue})`)).toBe(false);
                    expect(isRGB({ red, green, blue })).toBe(false);
                    expect(isRGB({ r: red, g: green, b: blue })).toBe(false);
                    expect(isRGB([red, green, blue])).toBe(false);
                }
                INVALID_PERCENTS.forEach((alpha, idx_alpha) => {
                    if (idx_red >= 5 || idx_green || idx_blue || idx_alpha) {
                        expect(isRGB(`rgb(${red} ${green} ${blue} / ${alpha})`)).toBe(false);
                        expect(isRGB(`rgb(${red}, ${green}, ${blue}, ${alpha})`)).toBe(false);
                        expect(isRGB(`rgba (${red} ${green} ${blue} / ${alpha})`)).toBe(false);
                        expect(isRGB(`rgba(${red} ${green} ${blue} ${alpha})`)).toBe(false);
                        expect(isRGB({ red, green, blue, alpha })).toBe(false);
                        expect(isRGB({ r: red, g: green, b: blue, a: alpha })).toBe(false);
                        expect(isRGB([red, green, blue, alpha])).toBe(false);
                    }
                });
            });
        });
    });
});
