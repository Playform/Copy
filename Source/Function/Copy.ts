import type { Plugin } from "esbuild";

export default async (Option: Partial<Option> = {}): Promise<Plugin> => {
	const {
		Asset = [],
		Copy = false,
		Glob = {},
		Verbose: _Verbose = false,
		Once = false,
		Resolve = "out",
		Dry = false,
	} = Option;

	const Verbose = Dry === true || _Verbose;

	const Format = (await import("@Function/Format")).default(Asset);

	const Apply = Copy ? "onStart" : "onEnd";

	return {
		name: "plugin:copy",
		setup(build) {
			build[Apply](async () => {
				if (Once && process.env[PLUGIN_EXECUTED_FLAG] === "true") {
					Log(
						`Copy plugin skipped as option ${Chalk.white("Once")} set to true`,
						Verbose
					);
					return;
				}

				if (!Format.length) {
					return;
				}

				// the base destination dir that will resolve with asset.to value
				let outDirResolveFrom: string;

				// resolve from cwd
				if (Resolve === "cwd") {
					outDirResolveFrom = process.cwd();
					// resolve from outdir or outfile
				} else if (Resolve === "out") {
					// outdir takes precedence over outfile because it should be used more widely
					const outDir =
						build.initialOptions.outdir ??
						// for outfile, use the directory it located in
						(await import("path")).dirname(
							build.initialOptions.outfile!
						);

					// This log should not be displayed as ESBuild will ensure one of options provided
					if (!outDir) {
						Log(
							Chalk.red(
								`You should provide valid ${Chalk.white(
									"outdir"
								)} or ${Chalk.white(
									"outfile"
								)} for assets copy. received outdir:${
									build.initialOptions.outdir
								}, received outfile:${build.initialOptions.outfile}`
							),
							Verbose
						);

						return;
					}

					outDirResolveFrom = outDir;
				} else {
					// use custom Resolve dir
					outDirResolveFrom = Resolve;
				}

				// the final value of outDirResolveFrom will be used by all asset pairs
				// both relative and absolute path are okay
				Log(
					`Resolve assert pair to path from: ${(
						await import("path")
					).resolve(outDirResolveFrom)}`,
					Verbose
				);

				for (const { from, to } of Format) {
					const deduplicatedPaths = [
						...new Set(
							await (
								await import("fast-glob")
							).default(from, {
								// ensure outputs contains only file path
								onlyFiles: true,
								...Glob,
							})
						),
					];

					if (!deduplicatedPaths.length) {
						Log(
							`No files matched using current glob pattern: ${Chalk.white(
								from
							)}, maybe you need to configure globby by ${Chalk.white(
								"options.Glob"
							)}?`,
							Verbose
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
									Verbose,
									Dry
								);
							});
						}

						process.env[PLUGIN_EXECUTED_FLAG] = "true";
					};
				}
			});
		},
	};
};

import type Option from "@Interface/Option.js";

export const PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";

export const { default: Chalk } = await import("chalk");

export const { default: Log } = await import("@Function/Log.js");

export const { default: Handle } = await import("@Function/Handle.js");
