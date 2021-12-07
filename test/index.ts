/// <reference path="index.d.ts" />
import * as logger from '@jochlain/logger';

module.exports = () => {
    return Promise.resolve().then(() => {
        return require('./cases/rgb')();
    }).then(() => {
        return require('./cases/hsl')();
    });
};

if (require.main === module) {
    module.exports().catch((err: Error) => {
        logger.error(err);
        process.exit(1);
    });
}
