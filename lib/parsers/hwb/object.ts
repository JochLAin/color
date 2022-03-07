import { shwb2hwb } from "../../converters";
import { HWB_OBJECT, HWB_SHORTCUT } from "../../types";
import { isShortcutHWB } from "../../testers";
import { normalizeHWB } from "../../normalizers";

export default (props: HWB_OBJECT | HWB_SHORTCUT): HWB_OBJECT => {
    if (typeof props === 'object' && isShortcutHWB(props)) {
        return shwb2hwb(props);
    }
    return normalizeHWB(props);
};
