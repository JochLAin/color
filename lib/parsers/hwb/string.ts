import { HWB_OBJECT } from "../../types";
import { HWB_REGEXP_FULL } from "../../constants";
import { getValidHWB } from "../../normalizers";

export default (props: string): HWB_OBJECT => {
    const match = props.match(HWB_REGEXP_FULL);
    if (!match) throw new Error(`HWB string must match ${HWB_REGEXP_FULL.toString()}`);

    return getValidHWB({
        hue: Number(match[1]),
        white: Number(match[2]),
        black: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};
