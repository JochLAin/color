import { HWB } from "../../types";
import { getValidHWB } from "../../validators";

export default (props: [number, number, number, number?]): HWB => {
    const [hue, white, black, alpha] = props;
    return getValidHWB({ hue, white, black, alpha });
};
