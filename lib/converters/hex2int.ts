import { COLOR, HEX, INT } from "../types";

export default (props: COLOR & HEX): INT => {
    return { int: parseInt(props.hex.slice(1), 16) & 0xFFFFFF };
};
