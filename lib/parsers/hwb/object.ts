import { shwb2hwb } from "../../converters";
import { HWB_OBJECT, HWB_SHORTCUT } from "../../types";
import { isShortcutHWB } from "../../testers";
import { getValidHWB } from "../../validators";

export default (props: HWB_OBJECT | HWB_SHORTCUT): HWB_OBJECT => {
    if (typeof props === 'object' && isShortcutHWB(props)) {
        return shwb2hwb(props);
    }
    return getValidHWB(props);
};
