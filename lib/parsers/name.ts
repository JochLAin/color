import { HEX } from "../types";
import { NAMES } from "../constants";
import { parseHEX } from "../parsers";

const parseName = (props: string): HEX => {
    if (props in Object.keys(NAMES)) throw new Error(`Unknown name for "${props}"`);
    return { ...parseHEX({ hex: NAMES[props] }), name: props };
};
