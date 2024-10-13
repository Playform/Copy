/**
 * @module Handle
 *
 * @param outDirResolveFrom the base destination dir that will resolve with asset.to value
 * @param rawFromPath the original asset.from value from user config
 * @param globbedFromPath the globbed file from path, which are globbed from rawFromPath
 * @param baseToPath the original asset.to value from user config, which will be resolved with outDirResolveFrom option
 * @param Verbose Verbose logging
 * @param Dry Dry run mode
 * @returns
 */
declare const _default: (
	Out: string,
	Raw: string[],
	Glob: string,
	Base: string,
	Verbose?: boolean,
	Dry?: boolean,
) => Promise<void>;
export default _default;
export declare const resolve: (...paths: string[]) => string;
export declare const Log: (
	Message: string,
	Verbose: boolean,
	Before?: boolean,
) => Promise<void>;
