import { HEX, INT } from "../types";

export default (props: HEX): INT => {
    return { int: parseInt(props.hex.slice(1), 16) & 0xFFFFFF };
};
