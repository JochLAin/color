import { HSL, INT } from "../types";
import int2rgb from "./int2rgb";
import rgb2hsl from "./rgb2hsl";

export default (props: INT): HSL => {
    return rgb2hsl(int2rgb(props));
};
