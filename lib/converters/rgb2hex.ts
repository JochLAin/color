import { HEX, RGB } from "../types";
import hex2name from "./hex2name";
import {HEX_NAMES} from "../constants";

export default (props: RGB): HEX => {
    let hex = '#';
    hex += Math.round(props.red).toString(16).padStart(2, '0');
    hex += Math.round(props.green).toString(16).padStart(2, '0');
    hex += Math.round(props.blue).toString(16).padStart(2, '0');
    if (props.alpha !== undefined && props.alpha !== 100) {
        hex += Math.round(props.alpha / 100.0 * 255.0).toString(16).padStart(2, '0');
    }
    hex = hex.toUpperCase();
    return hex2name({ hex, name: HEX_NAMES[hex] });
};
