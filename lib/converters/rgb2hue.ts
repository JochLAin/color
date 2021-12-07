import { RGB } from "../types";

export default (props: RGB, min: number, max: number): number => {
    const delta = max - min;
    let hue: number = ((): number => {
        if (max.toFixed(10) === min.toFixed(10)) return 0.0;
        switch (max) {
            case props.red: return (props.green - props.blue) / delta;
            case props.green: return (props.blue - props.red) / delta + 2.0;
            case props.blue: return (props.red - props.green) / delta + 4.0;
        }
        return 0;
    })();

    if (Number.isNaN(Number(hue))) hue = 0.0;
    hue *= 60.0;
    if (hue < 0.0) hue += 360.0;

    return hue % 360.0;
};
