import { COLOR, HWB, RGB } from "../types";
import { normalizeRGB } from "../normalizers";
import hsl2rgb from "./hsl2rgb";

export default (props: COLOR & HWB): RGB => {
    let { hue, white, black } = props;
    white /= 100.0; black /= 100.0;

    const total = white + black;
    if (total > 1) {
        white /= total;
        black /= total;
    }

    const { red, green, blue } = hsl2rgb({ hue, saturation: 1, lightness: 0.5 });
    const values = [red / 255.0, green / 255.0, blue / 255.0];
    for (let idx = 0; idx < 3; idx++) {
        values[idx] *= (1 - white - black);
        values[idx] += white;
    }

    return normalizeRGB({
        red: values[0] * 255.0,
        green: values[1] * 255.0,
        blue: values[2] * 255.0,
    });
};
