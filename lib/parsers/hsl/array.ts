import { HSL_ARRAY, HSL_OBJECT } from "../../types";
import { normalizeHSL } from "../../normalizers";

export default (props: HSL_ARRAY): HSL_OBJECT => {
    const [hue, saturation, lightness, alpha] = props;
    return normalizeHSL({ hue, saturation, lightness, alpha });
};
