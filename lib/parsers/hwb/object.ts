import { shwb2hwb } from "../../converters";
import { HWB, sHWB } from "../../types";
import { isSHWB } from "../../utils";
import { getValidHWB } from "../../validators";

export default (props: HWB | sHWB): HWB => {
    if (typeof props === 'object' && isSHWB(props)) {
        props = shwb2hwb(props as sHWB);
    }
    return getValidHWB(props as HWB);
};
