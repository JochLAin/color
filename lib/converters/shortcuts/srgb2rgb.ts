import { RGB_OBJECT, RGB_SHORTCUT } from "../../types";

export default (props: RGB_SHORTCUT): RGB_OBJECT => {
    const { r: red, g: green, b: blue, a: alpha } = props;
    return { red, green, blue, alpha };
};
