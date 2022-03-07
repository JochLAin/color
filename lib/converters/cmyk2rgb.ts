import { COLOR, CMYK, RGB } from "../types";
import { normalizeRGB } from "../normalizers";

export default (props: COLOR & CMYK): RGB => {
    let { cyan, magenta, yellow, black } = props;
    cyan /= 100.0; magenta /= 100.0; yellow /= 100.0; black /= 100.0;

    return normalizeRGB({
        red: 255.0 - ((Math.min(1, cyan * (1 - black) + black)) * 255.0),
        green: 255.0 - ((Math.min(1, magenta * (1 - black) + black)) * 255.0),
        blue: 255.0 - ((Math.min(1, yellow * (1 - black) + black)) * 255.0),
    });
};
