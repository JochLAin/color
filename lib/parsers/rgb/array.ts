import { RGB_ARRAY, RGB_OBJECT } from "../../types";
import { normalizeRGB } from "../../normalizers";

export default (props: RGB_ARRAY): RGB_OBJECT => {
    const [red, green, blue, alpha] = props;
    return normalizeRGB({ red, green, blue, alpha });
};
