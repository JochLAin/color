const sass = require('node-sass');
const logger = require('@jochlain/logger');
const paint = require('../lib');

const NB_SHADE_BY_ITERATION = 10;
const PERCENT_STEP = 10;

class ErrorColor extends Error {
    constructor(title, from, css, color) {
        super();
        this.from = paint(from);
        this.css = paint(css);
        this.color = paint(color);

        this.message = `Error on ${title}`;
        this.message += `\n| From     | ${this.from.hex} | ${this.from.rgb.padEnd(18, ' ')} | ${this.from.hsl.padEnd(18, ' ')} |`;
        this.message += `\n|${Array(11).join('-')}|${Array(10).join('-')}|${Array(21).join('-')}|${Array(21).join('-')}|`;
        this.message += `\n| Expected | ${this.css.hex} | ${this.css.rgb.padEnd(18, ' ')} | ${this.css.hsl.padEnd(18, ' ')} |`;
        this.message += `\n|${Array(11).join('-')}|${Array(10).join('-')}|${Array(21).join('-')}|${Array(21).join('-')}|`;
        this.message += `\n| Got      | ${this.color.hex} | ${this.color.rgb.padEnd(18, ' ')} | ${this.color.hsl.padEnd(18, ' ')} |`;
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

const compare = (from, css, color, test) => {
    return new Promise((resolve) => {
        sass.render({
            data: `$color: ${css};body { color: $color; }`,
        }, function (error, results) {
            if (error) throw error;
            const color = results.css.toString().match(/color: ([^;]+);/)[1];
            resolve(paint(color));
        });
    }).then((code) => {
        if (!test(color, code)) {
            throw new ErrorColor(css, from, code, color);
        }
    });
};

module.exports = () => {
    // console.log(paint.random());
    return Promise.resolve()
        .then(looper('Read RGB', (color) => compare(
            color,
            color.rgb,
            paint(color.rgb),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Read HSL', (color) => compare(
            color,
            color.hsl,
            paint(color.hsl),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Complement', (color) => compare(
            color,
            `complement(${color})`,
            color.complement(),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Invert', (color, idx) => compare(
            color,
            `invert(${color.hex})`,
            color.invert(),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Niveau de gris', (color, idx) => compare(
            color,
            `grayscale(${color.hex})`,
            color.grayscale(),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Saturation', (color, idx) => compare(
            color,
            `saturate(${color.hex}, ${idx}%)`,
            color.saturate(idx),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Désaturation', (color, idx) => compare(
            color,
            `desaturate(${color.hex}, ${idx}%)`,
            color.desaturate(idx),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Lighten', (color, idx) => compare(
            color,
            `lighten(${color.hex}, ${idx}%)`,
            color.lighten(idx),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        .then(looper('Darken', (color, idx) => compare(
            color,
            `darken(${color.hex}, ${idx}%)`,
            color.darken(idx),
            (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        )))
        // .then(looper('Mix white', (color, idx) => compare(
        //     color,
        //     `mix(${color.hex}, #FFF, ${idx}%)`,
        //     paint.mix('#FFF', color, idx),
        //     (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        // )))
        // .then(looper('Mix black', (color, idx) => compare(
        //     color,
        //     `mix(${color.hex}, #000, ${idx}%)`,
        //     paint.mix('#000', color, idx),
        //     (color1, color2) => color1.rgb === color2.rgb || color1.hsl === color2.hsl,
        // )))
    ;
};

if (require.main === module) {
    module.exports().catch((err) => {
        logger.error(err);
        process.exit(1);
    });
}
