import { HWB_ARRAY, HWB_OBJECT } from "../../types";
import { getValidHWB } from "../../normalizers";

export default (props: HWB_ARRAY): HWB_OBJECT => {
    const [hue, white, black, alpha] = props;
    return getValidHWB({ hue, white, black, alpha });
};
