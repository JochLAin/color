import { RGB_ARRAY, RGB_OBJECT } from "../../types";
import { getValidRGB } from "../../normalizers";

export default (props: RGB_ARRAY): RGB_OBJECT => {
    const [red, green, blue, alpha] = props;
    return getValidRGB({ red, green, blue, alpha });
};
