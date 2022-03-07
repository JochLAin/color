import { HEX_REGEX } from "../constants";
import { HEX } from "../types";
import { getValidAlpha } from "../normalizers";

export default (props: HEX): HEX => {
    const match = props.hex.match(HEX_REGEX);
    if (!match) throw new Error(`HEX string must match with ${HEX_REGEX.toString()}`);
    if ([3, 4].includes(match[1].length)) {
        props.hex = `#${match[1].split('').map((c) => `${c}${c}`).join('')}`;
    }

    if (/^#[\dA-Fa-f]{8}$/.test(props.hex)) {
        const alpha = getValidAlpha(Math.round(parseInt(props.hex.substr(7, 2), 16) / 0xFF * 100));
        let { hex } = props;
        if (alpha === 100) hex = hex.slice(0, -2);
        return { hex: hex.toUpperCase(), alpha };
    }
    return { hex: props.hex.toUpperCase(), alpha: 100 };
};
