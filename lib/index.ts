import { OptionalColor } from "./types";
import parse from './parser';

export default (props: number|string|number[]|OptionalColor) => {
    const params = parse(props);

};
