import { HWB_REGEX } from "../../constants";
import { HWB, sHWB } from "../../types";
import { isHWB, isSHWB } from "../../utils";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: string | [number, number, number, number?] | HWB | sHWB): HWB => {
    if (typeof props === 'object' && isSHWB(props)) return parseObject(props as sHWB);
    if (typeof props === 'object' && isHWB(props)) return parseObject(props as HWB);
    if (typeof props === 'string' && HWB_REGEX.test(props)) return parseString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseArray(props);
    throw new Error(`Unknown HWB format for ${props}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
