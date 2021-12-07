import { HSL, NCOL } from "../types";
import hue2ncol from "./hue2ncol";
import hsl2hwb from "./hsl2hwb";

export default (props: HSL): NCOL => {
    const hwb = hsl2hwb(props);
    return {
        ncol: hue2ncol(hwb.hue),
        white: hwb.white,
        black: hwb.black,
    };
};
