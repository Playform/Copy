import type { Options } from "fast-glob";

import type AssetPair from "../Interface/AssetPair.js";
import type MaybeArray from "../Type/MaybeArray.js";

/**
 * @module Option
 *
 */
export default interface Interface {
	/**
	 * Asset pair to copy
	 *
	 * @default []
	 */
	Asset: MaybeArray<AssetPair>;

	/**
	 * Copy in `ESBuild.onEnd` hook(recommended)
	 *
	 * set to true if you want to execute in onStart hook
	 *
	 * @default false
	 */
	Copy: boolean;

	/**
	 * enable verbose logging
	 *
	 * outputs from-path and to-path finally passed to `fs.copyFileSync` method
	 *
	 * @default false
	 */
	Verbose: boolean;

	/**
	 * options passed to `fast-glob` when we 're globbing for files to copy
	 *
	 * @default {}
	 */
	Glob: Options;

	/**
	 * Execute copy operation only once
	 *
	 * @default false
	 */
	Once: boolean;

	/**
	 * Resolve base path relative `assets.to` path
	 * by default this plugin use `outdir` or `outfile` in your ESBuild options
	 * you can specify "Current" or process.cwd() to resolve from current working directory,
	 * also, you can specify somewhere else to resolve from.
	 *
	 * @default "Out"
	 */
	Resolve: "Current" | "Out" | (string & {});

	/**
	 * use dry run mode to see what's happening.
	 *
	 * by default, enable this option means enable `verbose` option in the same time
	 *
	 * @default false
	 */
	Dry?: boolean;
}
