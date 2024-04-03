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
declare const _default: (outDirResolveFrom: string, rawFromPath: string[], globbedFromPath: string, baseToPath: string, verbose?: boolean, dryRun?: boolean) => Promise<void>;
export default _default;
