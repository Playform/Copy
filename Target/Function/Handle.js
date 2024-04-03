"use strict";
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
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var chalk_1 = require("chalk");
var utils_1 = require("./utils");
/**
 *
 * @param outDirResolveFrom the base destination dir that will resolve with asset.to value
 * @param rawFromPath the original asset.from value from user config
 * @param globbedFromPath the globbed file from path, which are globbed from rawFromPath
 * @param baseToPath the original asset.to value from user config, which will be resolved with outDirResolveFrom option
 * @param verbose verbose logging
 * @param dryRun dry run mode
 * @returns
 */
exports.default = (function (outDirResolveFrom_1, rawFromPath_1, globbedFromPath_1, baseToPath_1) {
    var args_1 = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args_1[_i - 4] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([outDirResolveFrom_1, rawFromPath_1, globbedFromPath_1, baseToPath_1], args_1, true), void 0, function (outDirResolveFrom, rawFromPath, globbedFromPath, baseToPath, verbose, dryRun) {
        var _a, rawFromPath_2, rawFrom, dir, startFragment, _b, preservedDirStructure, sourcePath, isToPathDir, composedDistDirPath;
        if (verbose === void 0) { verbose = false; }
        if (dryRun === void 0) { dryRun = false; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = 0, rawFromPath_2 = rawFromPath;
                    _c.label = 1;
                case 1:
                    if (!(_a < rawFromPath_2.length)) return [3 /*break*/, 4];
                    rawFrom = rawFromPath_2[_a];
                    dir = path_1.default.parse(rawFrom).dir;
                    // be default, when ends with /*, glob doesnot expand directories
                    // avoid use override option `expandDirectories` and use `/*`
                    // if from path ends with /* like assets/* or assets/*.ext, we give a warning?
                    if (!dir.endsWith("/**")) {
                        (0, utils_1.verboseLog)("The from path ".concat(chalk_1.default.white(rawFromPath), " of current asset pair doesnot ends with ").concat(chalk_1.default.white("/**/*(.ext)"), ", "), verbose);
                    }
                    startFragment = dir.replace("/**", "");
                    _b = globbedFromPath.split(startFragment), preservedDirStructure = _b[1];
                    sourcePath = path_1.default.resolve(globbedFromPath);
                    isToPathDir = path_1.default.extname(baseToPath) === "";
                    composedDistDirPath = isToPathDir
                        ? // /RESOLVE_FROM_DIR/SPECIFIED_TO_DIR/LEFT_FILE_STRUCTURE
                            path_1.default.resolve(
                            // base resolve destination dir
                            outDirResolveFrom, 
                            // configures destination dir
                            baseToPath, 
                            // internal dir structure, remove the first slash
                            preservedDirStructure.slice(1))
                        : path_1.default.resolve(
                        // base resolve destination dir
                        outDirResolveFrom, 
                        // configures destination dir
                        baseToPath);
                    dryRun ? void 0 : fs_extra_1.default.ensureDirSync(path_1.default.dirname(composedDistDirPath));
                    dryRun ? void 0 : fs_extra_1.default.copyFileSync(sourcePath, composedDistDirPath);
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("@Function/Log.js"); })];
                case 2:
                    (_c.sent()).default("".concat(dryRun ? chalk_1.default.white("[DryRun] ") : "", "File copied: ").concat(chalk_1.default.white(sourcePath), " -> ").concat(chalk_1.default.white(composedDistDirPath)), verbose);
                    _c.label = 3;
                case 3:
                    _a++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
});
