/**
 * @module AssetPair
 *
 */
export default interface Interface {
	/**
	 * from path is resolved based on `cwd`
	 */
	from: MaybeArray<string>;

	/**
	 * to path is resolved based on `outdir` or `outfile` in your ESBuild options by default
	 * you can also set `resolveFrom` to change the base dir
	 */
	to: MaybeArray<string>;

	/**
	 * control watch mode for current assets
	 *
	 * @default false
	 */
	watch?: boolean | WatchOptions;
}

import type MaybeArray from "@Type/MaybeArray.js";

import type { WatchOptions } from "chokidar";
