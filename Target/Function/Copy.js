"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = exports.Log = exports.Chalk = exports.PLUGIN_EXECUTED_FLAG = void 0;
exports.default = (function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (Option) {
        var _a, Asset, _b, Copy, _c, Glob, _d, _Verbose, _e, Once, _f, Resolve, _g, Dry, Verbose, Format, Apply;
        if (Option === void 0) { Option = {}; }
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = Option.Asset, Asset = _a === void 0 ? [] : _a, _b = Option.Copy, Copy = _b === void 0 ? false : _b, _c = Option.Glob, Glob = _c === void 0 ? {} : _c, _d = Option.Verbose, _Verbose = _d === void 0 ? false : _d, _e = Option.Once, Once = _e === void 0 ? false : _e, _f = Option.Resolve, Resolve = _f === void 0 ? "out" : _f, _g = Option.Dry, Dry = _g === void 0 ? false : _g;
                    Verbose = Dry === true || _Verbose;
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("@Function/Format.js"); })];
                case 1:
                    Format = (_h.sent()).default(Asset);
                    Apply = Copy ? "onStart" : "onEnd";
                    return [2 /*return*/, {
                            name: "@playform/copy",
                            setup: function (build) {
                                var _this = this;
                                build[Apply](function () { return __awaiter(_this, void 0, void 0, function () {
                                    var outDirResolveFrom, outDir, _a, _b, _c, _loop_1, _i, Format_1, _d, from, to;
                                    var _e;
                                    return __generator(this, function (_f) {
                                        switch (_f.label) {
                                            case 0:
                                                if (Once && process.env[exports.PLUGIN_EXECUTED_FLAG] === "true") {
                                                    (0, exports.Log)("Copy plugin skipped as option ".concat(exports.Chalk.white("Once"), " set to true"), Verbose);
                                                    return [2 /*return*/];
                                                }
                                                if (!Format.length) {
                                                    return [2 /*return*/];
                                                }
                                                if (!(Resolve === "cwd")) return [3 /*break*/, 1];
                                                outDirResolveFrom = process.cwd();
                                                return [3 /*break*/, 6];
                                            case 1:
                                                if (!(Resolve === "out")) return [3 /*break*/, 5];
                                                if (!((_e = build.initialOptions.outdir) !== null && _e !== void 0)) return [3 /*break*/, 2];
                                                _a = _e;
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, Promise.resolve().then(function () { return require("path"); })];
                                            case 3:
                                                // for outfile, use the directory it located in
                                                _a = (_f.sent()).dirname(build.initialOptions.outfile);
                                                _f.label = 4;
                                            case 4:
                                                outDir = _a;
                                                // This log should not be displayed as ESBuild will ensure one of options provided
                                                if (!outDir) {
                                                    (0, exports.Log)(exports.Chalk.red("You should provide valid ".concat(exports.Chalk.white("outdir"), " or ").concat(exports.Chalk.white("outfile"), " for assets copy. received outdir:").concat(build.initialOptions.outdir, ", received outfile:").concat(build.initialOptions.outfile)), Verbose);
                                                    return [2 /*return*/];
                                                }
                                                outDirResolveFrom = outDir;
                                                return [3 /*break*/, 6];
                                            case 5:
                                                // use custom Resolve dir
                                                outDirResolveFrom = Resolve;
                                                _f.label = 6;
                                            case 6:
                                                // the final value of outDirResolveFrom will be used by all asset pairs
                                                // both relative and absolute path are okay
                                                _b = exports.Log;
                                                _c = "Resolve assert pair to path from: ".concat;
                                                return [4 /*yield*/, Promise.resolve().then(function () { return require("path"); })];
                                            case 7:
                                                // the final value of outDirResolveFrom will be used by all asset pairs
                                                // both relative and absolute path are okay
                                                _b.apply(void 0, [_c.apply("Resolve assert pair to path from: ", [(_f.sent()).resolve(outDirResolveFrom)]), Verbose]);
                                                _loop_1 = function (from, to) {
                                                    var deduplicatedPaths, _g, _h, _loop_2, _j, deduplicatedPaths_1, fromPath;
                                                    return __generator(this, function (_k) {
                                                        switch (_k.label) {
                                                            case 0:
                                                                _g = [[]];
                                                                _h = Set.bind;
                                                                return [4 /*yield*/, Promise.resolve().then(function () { return require("fast-glob"); })];
                                                            case 1: return [4 /*yield*/, (_k.sent()).default(from, __assign({ 
                                                                    // ensure outputs contains only file path
                                                                    onlyFiles: true }, Glob))];
                                                            case 2:
                                                                deduplicatedPaths = __spreadArray.apply(void 0, _g.concat([new (_h.apply(Set, [void 0, _k.sent()]))(), true]));
                                                                if (!deduplicatedPaths.length) {
                                                                    (0, exports.Log)("No files matched using current glob pattern: ".concat(exports.Chalk.white(from), ", maybe you need to configure fast-glob by ").concat(exports.Chalk.white("options.Glob"), "?"), Verbose);
                                                                }
                                                                _loop_2 = function (fromPath) {
                                                                    to.forEach(function (toPath) {
                                                                        (0, exports.Handle)(outDirResolveFrom, from, fromPath, toPath, Verbose, Dry);
                                                                    });
                                                                };
                                                                for (_j = 0, deduplicatedPaths_1 = deduplicatedPaths; _j < deduplicatedPaths_1.length; _j++) {
                                                                    fromPath = deduplicatedPaths_1[_j];
                                                                    _loop_2(fromPath);
                                                                }
                                                                process.env[exports.PLUGIN_EXECUTED_FLAG] = "true";
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                _i = 0, Format_1 = Format;
                                                _f.label = 8;
                                            case 8:
                                                if (!(_i < Format_1.length)) return [3 /*break*/, 11];
                                                _d = Format_1[_i], from = _d.from, to = _d.to;
                                                return [5 /*yield**/, _loop_1(from, to)];
                                            case 9:
                                                _f.sent();
                                                _f.label = 10;
                                            case 10:
                                                _i++;
                                                return [3 /*break*/, 8];
                                            case 11: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            },
                        }];
            }
        });
    });
});
exports.PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";
exports.Chalk = (await Promise.resolve().then(function () { return require("chalk"); })).default;
exports.Log = (await Promise.resolve().then(function () { return require("@Function/Log.js"); })).default;
exports.Handle = (await Promise.resolve().then(function () { return require("@Function/Handle.js"); })).default;
