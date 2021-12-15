import { HSL } from "../../types";
import { getValidHSL } from "../../validators";

export default (props: [number, number, number, number?]): HSL => {
    const [hue, saturation, lightness, alpha] = props;
    return getValidHSL({ hue, saturation, lightness, alpha });
};
