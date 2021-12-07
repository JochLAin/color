import { NCOL, RGB } from "../types";
import hue2ncol from "./hue2ncol";
import rgb2hwb from "./rgb2hwb";

export default (props: RGB): NCOL => {
    const hwb = rgb2hwb(props);
    return {
        ncol: hue2ncol(hwb.hue),
        white: hwb.white,
        black: hwb.black,
    };
};
