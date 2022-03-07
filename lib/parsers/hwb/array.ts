import { HWB_ARRAY, HWB_OBJECT } from "../../types";
import { normalizeHWB } from "../../normalizers";

export default (props: HWB_ARRAY): HWB_OBJECT => {
    const [hue, white, black, alpha] = props;
    return normalizeHWB({ hue, white, black, alpha });
};
