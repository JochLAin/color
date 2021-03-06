import { CMYK, COLOR, RGB } from "../types";
import { normalizeCMYK } from "../normalizers";

export default (props: COLOR & RGB): CMYK => {
    let { red, green, blue } = props;
    red /= 255.0; green /= 255.0; blue /= 255.0;

    const max = Math.max(red, green, blue);
    if (max === 0) {
        return normalizeCMYK({
            cyan: 0.0,
            magenta: 0.0,
            yellow: 0.0,
            black: 100.0
        });
    }

    const black = 1.0 - max;
    return normalizeCMYK({
        cyan: (1.0 - red - black) / max * 100.0,
        magenta: (1.0 - green - black) / max * 100.0,
        yellow: (1.0 - blue - black) / max * 100.0,
        black: black * 100.0,
    });
};
