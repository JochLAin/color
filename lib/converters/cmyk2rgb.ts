import { CMYK, RGB } from "../types";
import { getValidRGB } from "../validators";

export default (props: CMYK): RGB => {
    let { cyan, magenta, yellow, black } = props;
    cyan /= 100.0; magenta /= 100.0; yellow /= 100.0; black /= 100.0;

    return getValidRGB({
        red: 255.0 - ((Math.min(1, cyan * (1 - black) + black)) * 255.0),
        green: 255.0 - ((Math.min(1, magenta * (1 - black) + black)) * 255.0),
        blue: 255.0 - ((Math.min(1, yellow * (1 - black) + black)) * 255.0),
    });
};
