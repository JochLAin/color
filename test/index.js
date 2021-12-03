const logger = require('@jochlain/logger');
const sass = require('sass');
const paint = require('../dist/cjs');

const NB_SHADE_BY_ITERATION = 10;
const PERCENT_STEP = 10;

module.exports = () => {
    return Promise.resolve()
        .then(looper('Read RGB', (color) => compare(
            color.rgb(),
            color,
            paint(color.rgb()),
        )))
        .then(looper('Read HSL', (color) => compare(
            color.hsl(),
            color,
            paint(color.hsl()),
        )))
        .then(looper('Complement', (color) => compare(
            `complement(${color.hex()})`,
            color,
            color.complement(),
        )))
        .then(looper('Invert', (color) => compare(
            `invert(${color.hex()})`,
            color,
            color.invert(),
        )))
        .then(looper('Niveau de gris', (color) => compare(
            `grayscale(${color.hex()})`,
            color,
            color.grayscale(),
        )))
        .then(looper('Saturation', (color, idx) => compare(
            `saturate(${color.hex()}, ${idx}%)`,
            color,
            color.saturate(idx),
        )))
        .then(looper('Désaturation', (color, idx) => compare(
            `desaturate(${color.hex()}, ${idx}%)`,
            color,
            color.desaturate(idx),
        )))
        .then(looper('Lighten', (color, idx) => compare(
            `lighten(${color.hex()}, ${idx}%)`,
            color,
            color.lighten(idx),
        )))
        .then(looper('Darken', (color, idx) => compare(
            `darken(${color.hex()}, ${idx}%)`,
            color,
            color.darken(idx),
        )))
        // .then(looper('Mix white', (color, idx) => compare(
        //     color,
        //     `mix(${color.hex()}, #FFF, ${idx}%)`,
        //     paint.mix('#FFF', color, idx),
        // )))
        // .then(looper('Mix black', (color, idx) => compare(
        //     color,
        //     `mix(${color.hex()}, #000, ${idx}%)`,
        //     paint.mix('#000', color, idx),
        // )))
    ;
};

const looper = (title, callback) => () => {
    let promise = Promise.resolve().then(() => {
        logger.info(`${title} start`);
    });
    for (let idx = 0; idx <= 100; idx += PERCENT_STEP) {
        promise = promise.then(() => {
            let promise = Promise.resolve();
            for (let index = 0; index < NB_SHADE_BY_ITERATION; index++) {
                promise = promise.then(() => callback(paint.random(), idx));
            }
            return promise;
        });
    }
    return promise.then(() => {
        logger.success(`${title} success`);
    });
};

const compare = (scss, from, value) => {
    const hasError = (from, to) => {
        const _from = from.toJSON();
        const _to = to.toJSON();

        if (_from.red < (_to.red - 1) || _from.red > (_to.red + 1)) return 'red';
        if (_from.green < (_to.green - 1) || _from.green > (_to.green + 1)) return 'green';
        if (_from.blue < (_to.blue - 1) || _from.blue > (_to.blue + 1)) return 'blue';
        if (_from.hue < (_to.hue - 1) || _from.hue > (_to.hue + 1)) return 'hue';
        if (_from.saturation < (_to.saturation - 1) || _from.saturation > (_to.saturation + 1)) return 'saturation';
        if (_from.lightness < (_to.lightness - 1) || _from.lightness > (_to.lightness + 1)) return 'lightness';

        return null;
    };

    return new Promise((resolve) => {
        sass.render({
            data: `$color: ${scss};\n\nbody { color: $color; }`,
        }, function (error, results) {
            if (error) throw error;
            const [, color] = results.css.toString().match(/color: ([^;]+);/);
            resolve(color);
        });
    }).then((color) => {
        const expected = paint(color);
        const field = hasError(expected, value);
        if (field) throw new ErrorColor(scss, color, from, expected, value);
    });
};

class ErrorColor extends Error {
    constructor(scss, color, from, expected, value) {
        super();
        const formats = [['hex', 9], ['rgb', 18], ['hsl', 20]];
        const colors = [['From', from], ['Expected', expected], ['Got', value]];

        const title = `Error on ${scss} => ${color}`;
        const separator = `|${''.padEnd(10, '-')}${formats.reduce((accu, [, length]) => `${accu}|${''.padEnd(length + 2, '-')}`, '')}|`;
        const [a, b, c] = colors.map(([label, color]) => `| ${label.padEnd(8, ' ')}${formats.reduce((accu, [method, length]) => `${accu} | ${color[method]().padEnd(length, ' ')}`, '')} |`);
        const border = `|${''.padEnd(formats.reduce((accu, [, length]) => accu + length + 2, formats.length + 10), '-')}|`;
        this.message = `${title}\n${border}\n${a}\n${separator}\n${b}\n${separator}\n${c}\n${border}`;

        // this.message += `\n RGB test: ${expected.rgb() === value.rgb()}`;
        // this.message += `\n HSL test: ${expected.hsl() === value.hsl()}`;
    }
}

if (require.main === module) {
    module.exports().catch((err) => {
        logger.error(err);
        process.exit(1);
    });
}
