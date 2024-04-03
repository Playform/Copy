import type { Plugin } from "esbuild";
declare const _default: (Option?: Partial<Option>) => Promise<Plugin>;
export default _default;
import type Option from "@Interface/Option.js";
export declare const PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";
export declare const Chalk: import("chalk").ChalkInstance;
export declare const Log: (msg: string, verbose: boolean, lineBefore?: boolean) => void;
export declare const Handle: (outDirResolveFrom: string, rawFromPath: string[], globbedFromPath: string, baseToPath: string, verbose?: boolean, dryRun?: boolean) => Promise<void>;
