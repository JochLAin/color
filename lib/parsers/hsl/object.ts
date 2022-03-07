import { shsl2hsl } from "../../converters";
import { HSL_OBJECT, HSL_SHORTCUT } from "../../types";
import { isShortcutHSL } from "../../testers";
import { normalizeHSL } from "../../normalizers";

export default (props: HSL_OBJECT|HSL_SHORTCUT): HSL_OBJECT => {
    if (isShortcutHSL(props)) props = shsl2hsl(props);
    return normalizeHSL(props);
};
