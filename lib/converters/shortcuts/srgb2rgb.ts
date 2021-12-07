import { RGB, sRGB } from "../../types";

export default (props: sRGB): RGB => {
    const { r: red, g: green, b: blue, a: alpha } = props;
    return { red, green, blue, alpha };
};
