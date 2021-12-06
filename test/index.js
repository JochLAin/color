const logger = require('@jochlain/logger');
const paint = require('../dist/cjs');
const datas = require('./datas.json');

const run = (key, datas, callback) => {
    for (let idx = 0; idx < datas.length; idx++) {
        const [from, percent, [hex, rgb, hsl]] = datas[idx];
        const color = paint(from);
        const value = callback(color, percent);

        if (value.hex() !== hex) throw new ErrorColor(`${key}(${color.hex()}, ${percent}%) => hex`, from, paint(hex), value);
        if (value.rgb() !== rgb) throw new ErrorColor(`${key}(${color.hex()}, ${percent}%) => rgb`, from, paint(hex), value);
        if (value.hsl() !== hsl) throw new ErrorColor(`${key}(${color.hex()}, ${percent}%) => hsl`, from, paint(hex), value);
    }
}

module.exports = () => {
    return Promise.resolve(() => {
        run('rgb', datas.rgb, (color) => color);
        run('hsl', datas.hsl, (color) => color);
        run('complement', datas.complement, (color) => color.complement());
        run('invert', datas.invert, (color) => color.invert());
        run('grayscale', datas.grayscale, (color) => color.grayscale());
        run('saturate', datas.saturate, (color, percent) => color.saturate(percent));
        run('desaturate', datas.desaturate, (color, percent) => color.desaturate(percent));
        run('lighten', datas.lighten, (color, percent) => color.lighten(percent));
        run('darken', datas.darken, (color, percent) => color.darken(percent));
    });
};

class ErrorColor extends Error {
    constructor(title, from, expected, value) {
        super();
        const formats = [['hex', 9], ['rgb', 18], ['hsl', 20]];
        const colors = [['From', from], ['Expected', expected], ['Got', value]];

        const separator = `|${''.padEnd(10, '-')}${formats.reduce((accu, [, length]) => `${accu}|${''.padEnd(length + 2, '-')}`, '')}|`;
        const [a, b, c] = colors.map(([label, color]) => `| ${label.padEnd(8, ' ')}${formats.reduce((accu, [method, length]) => `${accu} | ${color[method]().padEnd(length, ' ')}`, '')} |`);
        const border = `|${''.padEnd(formats.reduce((accu, [, length]) => accu + length + 2, formats.length + 10), '-')}|`;
        this.message = `Error on ${title}\n${border}\n${a}\n${separator}\n${b}\n${separator}\n${c}\n${border}`;
    }
}

if (require.main === module) {
    module.exports().catch((err) => {
        logger.error(err);
        process.exit(1);
    });
}
