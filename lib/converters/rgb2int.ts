import { COLOR, INT, RGB } from "../types";

export default (props: COLOR & RGB): INT => {
    const value = (Math.round(props.red) << 16) + (Math.round(props.green) << 8) + Math.round(props.blue);
    return { value: value & 0xFFFFFF };
};
