import { RGB } from "../../types";
import { RGB_REGEX } from "../../constants";
import { getValidRGB } from "../../validators";

export default (props: string): RGB => {
    const match = props.match(RGB_REGEX);
    if (!match) throw new Error(`RGB string must match ${RGB_REGEX.toString()}`);

    return getValidRGB({
        red: Number(match[1]),
        blue: Number(match[2]),
        green: Number(match[3]),
        alpha: Number(match[5] || 100),
    });
};
