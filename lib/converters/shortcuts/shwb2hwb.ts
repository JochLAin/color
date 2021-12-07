import { HWB, sHWB } from "../../types";

export default (props: sHWB): HWB => {
    const { h: hue, w: white, b: black, a: alpha } = props;
    return { hue, white, black, alpha };
};
