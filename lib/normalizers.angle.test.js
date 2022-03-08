import { normalizeAngle } from "./normalizers";

test('Test normalize angle degree', () => {
    expect(normalizeAngle('0deg')).toBe(0);
    expect(normalizeAngle('45deg')).toBe(45);
    expect(normalizeAngle('60deg')).toBe(60);
    expect(normalizeAngle('90deg')).toBe(90);
    expect(normalizeAngle('180deg')).toBe(180);
    expect(normalizeAngle('270deg')).toBe(270);
    expect(normalizeAngle('360deg')).toBe(0);
});

test('Test normalize angle degree', () => {
    expect(normalizeAngle('0°')).toBe(0);
    expect(normalizeAngle('45°')).toBe(45);
    expect(normalizeAngle('60°')).toBe(60);
    expect(normalizeAngle('90°')).toBe(90);
    expect(normalizeAngle('180°')).toBe(180);
    expect(normalizeAngle('270°')).toBe(270);
    expect(normalizeAngle('360°')).toBe(0);
});
