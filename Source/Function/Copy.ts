import type { Plugin } from "esbuild";

export default async (options: Partial<Options> = {}): Plugin => {
	const {
		assets = [],
		copyOnStart = false,
		Glob = {},
		verbose: _verbose = false,
		once = false,
		resolveFrom = "out",
		dryRun = false,
	} = options;

	const verbose = dryRun === true || _verbose;

	const formattedAssets = (await import("@Function/Format")).default(assets);

	const applyHook = copyOnStart ? "onStart" : "onEnd";

	return {
		name: "plugin:copy",
		setup(build) {
			build[applyHook](async () => {
				if (once && process.env[PLUGIN_EXECUTED_FLAG] === "true") {
					Log(
						`Copy plugin skipped as option ${chalk.white("once")} set to true`,
						verbose
					);
					return;
				}

				if (!formattedAssets.length) {
					return;
				}

				// the base destination dir that will resolve with asset.to value
				let outDirResolveFrom: string;

				// resolve from cwd
				if (resolveFrom === "cwd") {
					outDirResolveFrom = process.cwd();
					// resolve from outdir or outfile
				} else if (resolveFrom === "out") {
					// outdir takes precedence over outfile because it should be used more widely
					const outDir =
						build.initialOptions.outdir ??
						// for outfile, use the directory it located in
						(await import("path")).dirname(
							build.initialOptions.outfile!
						);

					// This log should not be displayed as ESBuild will ensure one of options provided
					if (!outDir) {
						chalk.red(
							`You should provide valid ${chalk.white(
								"outdir"
							)} or ${chalk.white(
								"outfile"
							)} for assets copy. received outdir:${
								build.initialOptions.outdir
							}, received outfile:${build.initialOptions.outfile}`
						),
							verbose;

						return;
					}

					outDirResolveFrom = outDir;
				} else {
					// use custom resolveFrom dir
					outDirResolveFrom = resolveFrom;
				}

				// the final value of outDirResolveFrom will be used by all asset pairs
				// both relative and absolute path are okay
				Log(
					`Resolve assert pair to path from: ${(
						await import("path")
					).resolve(outDirResolveFrom)}`,
					verbose
				);

				globalWatchControl
					? Log(
							`Watching mode enabled for all asset pairs, you can disable it by set ${chalk.white(
								"watch"
							)} to false in specified asset pairs`,
							verbose
						)
					: void 0;

				if (!build.initialOptions.watch) {
					Log(
						`Watching mode disabled. You need to enable ${chalk.white(
							"build.watch"
						)} option for watch mode to work.`,
						verbose
					);

					globalWatchControl = false;
				}

				for (const {
					from,
					to,
					watch: localWatchControl,
				} of formattedAssets) {
					const useWatchModeForCurrentAssetPair =
						globalWatchControl || localWatchControl;

					const deduplicatedPaths = [
						...new Set(
							await (
								await import("fast-glob")
							).default(from, {
								// we donot expand directories be default
								expandDirectories: false,
								// ensure outputs contains only file path
								onlyFiles: true,
								...Glob,
							})
						),
					];

					if (!deduplicatedPaths.length) {
						Log(
							`No files matched using current glob pattern: ${chalk.white(
								from
							)}, maybe you need to configure globby by ${chalk.white(
								"options.Glob"
							)}?`,
							verbose
						);
					}

					const executor = () => {
						for (const fromPath of deduplicatedPaths) {
							to.forEach((toPath) => {
								Handle(
									outDirResolveFrom,
									from,
									fromPath,
									toPath,
									verbose,
									dryRun
								);
							});
						}

						process.env[PLUGIN_EXECUTED_FLAG] = "true";
					};

					if (useWatchModeForCurrentAssetPair) {
						Log(
							`Watching mode enabled for current asset pair source: ${chalk.white(
								from
							)}, files will only be copied again on changes.`,
							verbose
						);

						executor();

						const watcher = chokidar.watch(from, {
							disableGlobbing: false,
							usePolling: true,
							interval: 200,
							...(typeof useWatchModeForCurrentAssetPair ===
							"object"
								? useWatchModeForCurrentAssetPair
								: {}),
						});

						watcher.on("change", (fromPath) => {
							Log(
								`[File Changed] File ${chalk.white(
									fromPath
								)} changed, copy operation triggered.`,
								verbose
							);

							to.forEach((toPath) => {
								Handle(
									outDirResolveFrom,
									from,
									fromPath,
									toPath,
									verbose,
									dryRun
								);
							});
						});
					} else {
						executor();
					}
				}
			});
		},
	};
};

export const PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";

import chalk from "chalk";
import chokidar from "chokidar";

export const { default: Log } = await import("@Function/Log.js");

export const { default: Handle } = await import("@Function/Handle.js");
