import { shsl2hsl } from "../../converters";
import { HSL, sHSL } from "../../types";
import { isSHSL } from "../../utils";
import { getValidHSL } from "../../validators";

export default (props: HSL | sHSL): HSL => {
    if (typeof props === 'object' && isSHSL(props)) {
        props = shsl2hsl(props as sHSL);
    }
    return getValidHSL(props as HSL);
};
