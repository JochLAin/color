import { HEX_REGEX } from "../constants";
import { HEX } from "../types";
import { normalizeAlpha } from "../normalizers";

export default (value: HEX): HEX => {
    const match = value.hex.match(HEX_REGEX);
    if (!match) throw new Error(`Invalid <hex> => ${value}`);
    if ([3, 4].includes(match[1].length)) {
        value.hex = `#${match[1].split('').map((c) => `${c}${c}`).join('')}`;
    }

    if (/^#[\dA-Fa-f]{8}$/.test(value.hex)) {
        const alpha = normalizeAlpha(Math.round(parseInt(value.hex.slice(7), 16) / 0xFF * 100));
        let { hex } = value;
        if (alpha === 100) hex = hex.slice(0, -2);
        return { hex: hex.toUpperCase(), alpha };
    }
    return { hex: value.hex.toUpperCase(), alpha: 100 };
};
