import { Color } from '../lib';

export const getErrorMessage = (title: string, [hex, rgb, hsl]: [string, string, string], result: Color) => {
    let message = title ? `${title}\n` : '';
    message += `| Expected | ${hex} | ${rgb.padEnd(18, ' ')} | ${hsl.padEnd(18, ' ')} |`;
    message += `\n|${Array(11).join('-')}|${Array(10).join('-')}|${Array(21).join('-')}|${Array(21).join('-')}|`;
    // @ts-ignore
    message += `\n| Got      | ${result.hex()} | ${result.rgb().padEnd(18, ' ')} | ${result.hsl().padEnd(18, ' ')} |`;

    return message;
};

export const run = function *(datas: string[][]) {
    for (let idx = 0; idx < datas.length; idx++) {
        const [hex, rgb, hsl] = datas[idx];
        const result = yield { hex, rgb, hsl };

        if (!(yield result)) {
            return Promise.reject([datas[idx], result]);
        }
    }
    return Promise.resolve();
};
