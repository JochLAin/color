import { HEX_REGEX } from "../constants";
import { COLOR, HEX, RGB } from "../types";
import { normalizeRGB } from "../normalizers";

export default (props: COLOR & HEX): RGB => {
    const match = props.hex.match(HEX_REGEX);
    if (!match) {
        return normalizeRGB({ red: 0.0, green: 0.0, blue: 0.0 });
    }
    return normalizeRGB({
        red: parseInt(match[1].slice(0, 2), 16),
        green: parseInt(match[1].slice(2, 4), 16),
        blue: parseInt(match[1].slice(4, 6), 16),
    });
};
