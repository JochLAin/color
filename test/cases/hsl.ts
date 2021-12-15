import * as logger from '@jochlain/logger';
import paint from "../../lib";
import datas from "../datas.json";
import { getErrorMessage, run } from "../utils";

module.exports = () => {
    logger.info('> HSL start');
    const it = run(datas);
    let next = it.next();
    while (!next.done) {
        const { hex, hsl } = next.value;
        const result = it.next(paint(hex)).value;
        next = it.next(result.hsl() === hsl);
    }

    return next.value.then(() => {
        logger.success('✓ HSL success');
    }, ([data, result]) => {
        const message = getErrorMessage(`hsl(${data[0]})`, data, result);
        logger.error(`× ${message}`);
    });
}
