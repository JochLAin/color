import { HWB } from "../../types";
import { HWB_REGEX } from "../../constants";
import { getValidHWB } from "../../validators";

export default (props: string): HWB => {
    const match = props.match(HWB_REGEX);
    if (!match) throw new Error(`HWB string must match ${HWB_REGEX.toString()}`);

    return getValidHWB({
        hue: Number(match[1]),
        white: Number(match[2]),
        black: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};
