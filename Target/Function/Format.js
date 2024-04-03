"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ensure = void 0;
/**
 * @module Format
 *
 */
exports.default = (function (Asset) {
    return (0, exports.Ensure)(Asset)
        .filter(function (Asset) { return Asset.from && Asset.to; })
        .map(function (_a) {
        var from = _a.from, to = _a.to;
        return ({
            from: (0, exports.Ensure)(from),
            to: (0, exports.Ensure)(to),
        });
    });
});
exports.Ensure = (await Promise.resolve().then(function () { return require("@Function/Ensure.js"); })).default;
