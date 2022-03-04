import { isArrayHSL, isObjectHSL, isShortcutHSL, isStringHSL } from "../../testers";
import { HSL, HSL_OBJECT } from "../../types";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: HSL): HSL_OBJECT => {
    if (isStringHSL(props)) return parseString(props);
    if (isObjectHSL(props) || isShortcutHSL(props)) return parseObject(props);
    if (isArrayHSL(props)) return parseArray(props);
    throw new Error(`Unknown HSL format for ${JSON.stringify(props)}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
