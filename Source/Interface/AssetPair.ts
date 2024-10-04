import type MaybeArray from "../Type/MaybeArray.js";

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
	 * you can also set `Resolve` to change the base dir
	 */
	to: MaybeArray<string>;
}
