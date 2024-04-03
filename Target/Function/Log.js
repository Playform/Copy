"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (msg, verbose, lineBefore) {
    if (lineBefore === void 0) { lineBefore = false; }
    if (!verbose) {
        return;
    }
    console.log(chalk.blue(lineBefore ? "\ni" : "i"), msg);
});
