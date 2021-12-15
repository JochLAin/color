import { HEX_NAMES } from "../constants";
import { COLOR, HEX, INT } from "../types";
import hex2name from "./hex2name";

export default (props: COLOR & INT): HEX => {
    let hex = '#';
    hex += props.value.toString(16).padStart(6, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100.0 * 255.0).toString(16).padStart(2, '0');
    }
    hex = hex.toUpperCase();
    return hex2name({ hex, name: HEX_NAMES[hex] });
};
