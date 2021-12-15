import { RGB } from "../../types";
import { getValidRGB } from "../../validators";

export default (props: [number, number, number, number?]): RGB => {
    const [red, green, blue, alpha] = props;
    return getValidRGB({ red, green, blue, alpha });
};
