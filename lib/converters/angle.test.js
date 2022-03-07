import { grad2deg, rad2deg, turn2deg, deg2rad, grad2rad, turn2rad, deg2grad, rad2grad, turn2grad, deg2turn, rad2turn, grad2turn } from "./angle";

test('Test grad2deg', () => {
    expect(grad2deg(50)).toBe(45);
    expect(grad2deg(2/3 * 100)).toBe(60);
    expect(grad2deg(100)).toBe(90);
    expect(grad2deg(200)).toBe(180);
    expect(grad2deg(400)).toBe(360);
});

test('Test rad2deg', () => {
    expect(rad2deg(Math.PI / 4)).toBe(45);
    expect(rad2deg(Math.PI / 3)).toBe(60);
    expect(rad2deg(Math.PI / 2)).toBe(90);
    expect(rad2deg(Math.PI)).toBe(180);
    expect(rad2deg(2 * Math.PI)).toBe(360);
});

test('Test turn2deg', () => {
    expect(turn2deg(1/8)).toBe(45);
    expect(turn2deg(1/6)).toBe(60);
    expect(turn2deg(1/4)).toBe(90);
    expect(turn2deg(1/2)).toBe(180);
    expect(turn2deg(1)).toBe(360);
});
