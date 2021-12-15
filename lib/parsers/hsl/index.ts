import { HSL_REGEX } from "../../constants";
import { HSL, sHSL } from "../../types";
import { isHSL, isSHSL } from "../../utils";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: string | [number, number, number, number?] | HSL | sHSL): HSL => {
    if (typeof props === 'object' && isSHSL(props)) return parseObject(props as sHSL);
    if (typeof props === 'object' && isHSL(props)) return parseObject(props as HSL);
    if (typeof props === 'string' && HSL_REGEX.test(props)) return parseString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseArray(props);
    throw new Error(`Unknown HSL format for ${props}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
