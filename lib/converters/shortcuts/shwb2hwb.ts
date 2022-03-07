import { HWB_OBJECT, HWB_SHORTCUT } from "../../types";

export default (props: HWB_SHORTCUT): HWB_OBJECT => {
    const { h: hue, w: white, b: black, a: alpha } = props;
    return { hue, white, black, alpha };
};
