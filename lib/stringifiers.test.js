import { stringifyHSL } from "./stringifiers";

test('Test stringify HSL', () => {
    expect(stringifyHSL({ hue: 180, saturation_hsl: 10, lightness: 33 })).toBe('hsl(180, 10%, 33%)');
    expect(stringifyHSL({ hue: '1e2', saturation_hsl: '23', lightness: '45' })).toBe('hsl(100, 23%, 45%)');
});
