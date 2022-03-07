import { HSL_REGEXP_FULL } from "../../constants";
import { HSL_OBJECT } from "../../types";
import { normalizeHSL } from "../../normalizers";

export default (props: string): HSL_OBJECT => {
    const match = props.match(HSL_REGEXP_FULL);
    if (!match) throw new Error(`HSL string must match with ${HSL_REGEXP_FULL.toString()}`);

    return normalizeHSL({
        hue: Number(match[1]),
        saturation: Number(match[2]),
        lightness: Number(match[3]),
        alpha: Number(match[5] || 100)
    });
};
