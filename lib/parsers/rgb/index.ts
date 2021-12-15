import { RGB_REGEX } from "../../constants";
import { RGB, sRGB } from "../../types";
import { isRGB, isSRGB } from "../../utils";
import parseArray from "./array";
import parseObject from "./object";
import parseString from "./string";

const parse = (props: string | [number, number, number, number?] | RGB | sRGB): RGB => {
    if (typeof props === 'object' && isSRGB(props)) return parseObject(props as sRGB);
    if (typeof props === 'object' && isRGB(props)) return parseObject(props as RGB);
    if (typeof props === 'string' && RGB_REGEX.test(props)) return parseString(props);
    if (typeof props === 'object' && Array.isArray(props)) return parseArray(props);
    throw new Error(`Unknown RGB format for ${props}`);
};

Object.assign(parse, { parseArray, parseObject, parseString });
export default parse;
export { parseArray, parseObject, parseString };
