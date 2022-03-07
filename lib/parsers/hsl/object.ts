import { shsl2hsl } from "../../converters";
import { HSL_OBJECT, HSL_SHORTCUT } from "../../types";
import { isShortcutHSL } from "../../testers";
import { getValidHSL } from "../../normalizers";

export default (props: HSL_OBJECT|HSL_SHORTCUT): HSL_OBJECT => {
    if (isShortcutHSL(props)) {
        return shsl2hsl(props);
    }
    return getValidHSL(props);
};
