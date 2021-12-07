import { INT, RGB } from "../types";

export default (props: RGB): INT => {
    const value = (Math.round(props.red) << 16) + (Math.round(props.green) << 8) + Math.round(props.blue);
    return { value: value & 0xFFFFFF };
};
