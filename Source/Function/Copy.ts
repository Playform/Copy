import type { Plugin } from "esbuild";

import type Option from "../Interface/Option.js";

export default async (Option: Partial<Option> = {}): Promise<Plugin> => {
	const {
		Asset = [],
		Copy = false,
		Glob = {},
		Verbose: _Verbose = false,
		Once = false,
		Resolve = "Out",
		Dry = false,
	} = Option;

	const Verbose = Dry === true || _Verbose;

	const Format = (await import("@Function/Format.js")).default(Asset);

	const Apply = Copy ? "onStart" : "onEnd";

	return {
		name: "@playform/copy",
		setup(build) {
			build[Apply](async () => {
				if (Once && process.env[PLUGIN_EXECUTED_FLAG] === "true") {
					await Log(
						`Copy plugin skipped as option ${Chalk.white(
							"Once",
						)} set to true`,
						Verbose,
					);

					return;
				}

				if (Format.length === 0) {
					return;
				}

				// The base destination dir that will resolve with asset.to value
				let outDirResolveFrom: string;

				// Resolve from cwd
				if (Resolve === "Current") {
					outDirResolveFrom = process.cwd();
					// Resolve from outdir or outfile
				} else if (Resolve === "Out") {
					// Outdir takes precedence over outfile because it should be used more widely
					const outDir =
						build.initialOptions.outdir ??
						// For outfile, use the directory it located in
						(await import("node:path")).dirname(
							build.initialOptions.outfile!,
						);

					// This log should not be displayed as ESBuild will ensure one of options provided
					if (!outDir) {
						await Log(
							Chalk.red(
								`You should provide valid ${Chalk.white(
									"outdir",
								)} or ${Chalk.white(
									"outfile",
								)} for assets copy. received outdir:${
									build.initialOptions.outdir
								}, received outfile:${
									build.initialOptions.outfile
								}`,
							),
							Verbose,
						);

						return;
					}

					outDirResolveFrom = outDir;
				} else {
					// Use custom Resolve dir
					outDirResolveFrom = Resolve;
				}

				// The final value of outDirResolveFrom will be used by all asset pairs
				// Both relative and absolute path are okay
				await Log(
					`Resolve assert pair to path from: ${(await import("node:path")).resolve(outDirResolveFrom)}`,
					Verbose,
				);

				for (const { from, to } of Format) {
					const deduplicatedPaths = [
						...new Set(
							await (
								await import("fast-glob")
							).default(from, {
								// Ensure outputs contains only file path
								onlyFiles: true,
								...Glob,
							}),
						),
					];

					if (deduplicatedPaths.length === 0) {
						await Log(
							`No files matched using current glob pattern: ${Chalk.white(
								from,
							)}, maybe you need to configure fast-glob by ${Chalk.white(
								"options.Glob",
							)}?`,
							Verbose,
						);
					}

					for (const fromPath of deduplicatedPaths) {
						to.forEach((toPath) => {
							Handle(
								outDirResolveFrom,
								from,
								fromPath,
								toPath,
								Verbose,
								Dry,
							);
						});
					}

					process.env[PLUGIN_EXECUTED_FLAG] = "true";
				}
			});
		},
	};
};

export const PLUGIN_EXECUTED_FLAG = "esbuild_copy_executed";

export const { default: Chalk } = await import("chalk");

export const { default: Log } = await import("@Function/Log.js");

export const { default: Handle } = await import("@Function/Handle.js");
