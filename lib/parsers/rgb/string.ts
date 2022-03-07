import { RGB_OBJECT } from "../../types";
import { RGB_REGEXP_FULL } from "../../constants";
import { normalizeRGB } from "../../normalizers";

export default (props: string): RGB_OBJECT => {
    const match = props.match(RGB_REGEXP_FULL);
    if (!match) throw new Error(`RGB string must match ${RGB_REGEXP_FULL.toString()}`);

    return normalizeRGB({
        red: Number(match[1]),
        blue: Number(match[2]),
        green: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};
