import { RGB } from "../types";

export default (props: RGB) => {
    return Math.min(props.red, props.green, props.blue) / 255.0 * 100.0;
};
