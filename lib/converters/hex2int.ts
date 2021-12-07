import { HEX, INT } from "../types";

export default (props: HEX): INT => {
    return { value: parseInt(props.hex.substr(1), 16) & 0xFFFFFF };
};
