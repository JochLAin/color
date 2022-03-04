import { HWB_OBJECT, HWB_SHORTCUT } from "../../types";
import { getValidHWB } from "../../validators";

export default (props: HWB_SHORTCUT): HWB_OBJECT => {
    const { h: hue, w: white, b: black, a: alpha } = props;
    return getValidHWB({ hue, white, black, alpha });
};
