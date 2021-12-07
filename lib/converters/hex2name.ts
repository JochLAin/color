import { HEX_NAMES } from "../constants";
import { HEX } from "../types";

export default (props: HEX): HEX => {
    if (props.hex in HEX_NAMES) {
        return { ...props, name: HEX_NAMES[props.hex] };
    }
    return props;
};
