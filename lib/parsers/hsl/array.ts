import { HSL_ARRAY, HSL_OBJECT } from "../../types";
import { getValidHSL } from "../../normalizers";

export default (props: HSL_ARRAY): HSL_OBJECT => {
    const [hue, saturation, lightness, alpha] = props;
    return getValidHSL({ hue, saturation, lightness, alpha });
};
