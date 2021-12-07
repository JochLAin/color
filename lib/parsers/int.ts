import { INT } from "../types";

export default (props: INT): INT => {
    return { value: props.value & 0xFFFFFF, alpha: 100 };
};
