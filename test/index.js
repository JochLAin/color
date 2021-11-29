const logger = require('@jochlain/logger');
const sass = require('sass');
const paint = require('../dist/cjs');

const NB_SHADE_BY_ITERATION = 10;
const PERCENT_STEP = 10;

class ErrorColor extends Error {
    constructor(title, from, css, color) {
        super();
        this.from = paint(from);
        this.css = paint(css);
        this.color = paint(color);

        this.message = `Error on ${title}`;
        this.message += `\n| From     | ${this.from.hex()} | ${this.from.rgb().padEnd(18, ' ')} | ${this.from.hsl().padEnd(18, ' ')} |`;
        this.message += `\n|${Array(11).join('-')}|${Array(10).join('-')}|${Array(21).join('-')}|${Array(21).join('-')}|`;
        this.message += `\n| Expected | ${this.css.hex()} | ${this.css.rgb().padEnd(18, ' ')} | ${this.css.hsl().padEnd(18, ' ')} |`;
        this.message += `\n|${Array(11).join('-')}|${Array(10).join('-')}|${Array(21).join('-')}|${Array(21).join('-')}|`;
        this.message += `\n| Got      | ${this.color.hex()} | ${this.color.rgb().padEnd(18, ' ')} | ${this.color.hsl().padEnd(18, ' ')} |`;
        this.message += `\n`;
        this.message += `\n RGB test: ${this.css.rgb() === this.color.rgb()}`;
        this.message += `\n HSL test: ${this.css.hsl() === this.color.hsl()}`;
    }
}

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

const compare = (from, css, color) => {
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
            data: `$color: ${css};\n\nbody { color: $color; }`,
        }, function (error, results) {
            if (error) throw error;
            const color = results.css.toString().match(/color: ([^;]+);/)[1];
            resolve(paint(color));
        });
    }).then((code) => {
        const field = hasError(color, code);
        if (field) {
            console.log(field, color.toJSON(), code.toJSON());
            throw new ErrorColor(css, from, code, color);
        }
    });
};

module.exports = () => {
    return Promise.resolve()
        .then(looper('Read RGB', (color) => compare(
            color,
            color.rgb(),
            paint(color.rgb()),
        )))
        .then(looper('Read HSL', (color) => compare(
            color,
            color.hsl(),
            paint(color.hsl()),
        )))
        .then(looper('Complement', (color) => compare(
            color,
            `complement(${color})`,
            color.complement(),
        )))
        .then(looper('Invert', (color, idx) => compare(
            color,
            `invert(${color.hex()})`,
            color.invert(),
        )))
        .then(looper('Niveau de gris', (color, idx) => compare(
            color,
            `grayscale(${color.hex()})`,
            color.grayscale(),
        )))
        .then(looper('Saturation', (color, idx) => compare(
            color,
            `saturate(${color.hex()}, ${idx}%)`,
            color.saturate(idx),
        )))
        .then(looper('Désaturation', (color, idx) => compare(
            color,
            `desaturate(${color.hex()}, ${idx}%)`,
            color.desaturate(idx),
        )))
        .then(looper('Lighten', (color, idx) => compare(
            color,
            `lighten(${color.hex()}, ${idx}%)`,
            color.lighten(idx),
        )))
        .then(looper('Darken', (color, idx) => compare(
            color,
            `darken(${color.hex()}, ${idx}%)`,
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

if (require.main === module) {
    module.exports().catch((err) => {
        logger.error(err);
        process.exit(1);
    });
}
