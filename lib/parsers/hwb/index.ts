import { isArrayHWB, isObjectHWB, isShortcutHWB, isStringHWB } from "../../testers";
import { HWB, HWB_OBJECT } from "../../types";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: HWB): HWB_OBJECT => {
    if (isStringHWB(props)) return parseString(props);
    if (isObjectHWB(props) || isShortcutHWB(props)) return parseObject(props);
    if (isArrayHWB(props)) return parseArray(props);
    throw new Error(`Unknown HWB format for ${JSON.stringify(props)}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
