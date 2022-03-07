import { COLOR, HWB, RGB } from "../types";
import { getValidHWB } from "../normalizers";
import rgb2hue from "./rgb2hue";

export default (props: COLOR & RGB, hue?: number): HWB => {
    const max = Math.max(props.red, props.green, props.blue);
    const min = Math.min(props.red, props.green, props.blue);

    return getValidHWB({
        hue: hue || rgb2hue(props, min, max),
        white: min / 255.0 * 100.0,
        black: (255.0 - max) / 255.0 * 100.0,
    });
};
