import * as logger from '@jochlain/logger';
import paint from "../../lib";
import * as datas from "../datas.json";
import { getErrorMessage, run } from "../utils";

module.exports = () => {
    logger.info('> RGB start');
    const it = run(datas);
    let next = it.next();
    while (!next.done) {
        const { hex, rgb } = next.value;
        const result = it.next(paint(hex)).value;
        next = it.next(result.rgb() === rgb);
    }

    return next.value.then(() => {
        logger.success('✓ RGB success');
    }, ([data, result]) => {
        const message = getErrorMessage(`rgb(${data[0]})`, data[2], result);
        logger.error(`× ${message}`);
    });
}
