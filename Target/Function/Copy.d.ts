import type { Plugin } from "esbuild";

import type Option from "../Interface/Option.js";

declare const _default: (Option?: Partial<Option>) => Promise<Plugin>;
export default _default;

export declare const PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";
export declare const Chalk: import("chalk").ChalkInstance;
export declare const Log: (
	Message: string,
	Verbose: boolean,
	Before?: boolean,
) => Promise<void>;
export declare const Handle: (
	Out: string,
	Raw: string[],
	Glob: string,
	Base: string,
	Verbose?: boolean,
	Dry?: boolean,
) => Promise<void>;
