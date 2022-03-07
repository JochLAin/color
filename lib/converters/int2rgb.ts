import { COLOR, INT, RGB } from "../types";
import { normalizeRGB } from "../normalizers";

export default (props: COLOR & INT): RGB => {
    return normalizeRGB({
        red: (props.value >> 16) & 255.0,
        green: (props.value >> 8) & 255.0,
        blue: props.value & 255.0,
    });
};
