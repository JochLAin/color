import { isArrayRGB, isObjectRGB, isShortcutRGB, isStringRGB } from "../../testers";
import { RGB, RGB_OBJECT } from "../../types";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: RGB): RGB_OBJECT => {
    if (isStringRGB(props)) return parseString(props);
    if (isObjectRGB(props) || isShortcutRGB(props)) return parseObject(props);
    if (isArrayRGB(props)) return parseArray(props);
    throw new Error(`Unknown RGB format for ${JSON.stringify(props)}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
