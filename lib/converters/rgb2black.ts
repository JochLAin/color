import { RGB } from "../types";

export default (props: RGB) => {
    return (255.0 - Math.max(props.red, props.green, props.blue)) / 255.0 * 100.0;
};
