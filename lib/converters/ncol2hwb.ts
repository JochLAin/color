import { HWB, NCOL } from "../types";
import { getValidHWB } from "../validators";

export default (props: NCOL): HWB => {
    let { ncol, white, black } = props;
    if (!Number.isNaN(Number(String(ncol).substr(0, 1)))) return { hue: Number(ncol), white, black };

    const letter = String(ncol).substr(0, 1).toUpperCase();
    const percent = Number(String(ncol).substr(1) || 0.0);
    if (Number.isNaN(Number(percent))) {
        return getValidHWB({
            hue: 0.0,
            white: 0.0,
            black: 100.0
        });
    }

    let hue = 0;
    if (letter === 'R') hue = percent * 0.6;
    if (letter === 'Y') hue = 60.0 + percent * 0.6;
    if (letter === 'G') hue = 120.0 + percent * 0.6;
    if (letter === 'C') hue = 180.0 + percent * 0.6;
    if (letter === 'B') hue = 240.0 + percent * 0.6;
    if (letter === 'M') hue = 300.0 + percent * 0.6;
    if (letter === 'W') {
        hue = 0.0;
        white = 1.0 - (percent / 100.0);
        black = percent / 100.0;
    }

    return getValidHWB({ hue, white, black });
};
