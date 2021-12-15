import { COLOR, HSL, INT } from "../types";
import int2rgb from "./int2rgb";
import rgb2hsl from "./rgb2hsl";

export default (props: COLOR & INT): HSL => {
    return rgb2hsl(int2rgb(props));
};
