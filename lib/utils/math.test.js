import Decimal, { PI, PIx2, round } from "./math";

test('Test math round', () => {
    expect(Number(Decimal(360).mod(360).toString())).toBe(0);
    expect(round(PI)).toBe(round(PI));
    expect(round(PIx2)).toBe(round(PIx2));
    expect(round(PIx2, PIx2, true)).toBe(round(0));
    expect(round(PI)).toBe(round(Math.PI));
    expect(round('0.000000000001')).toBe('0');
});
