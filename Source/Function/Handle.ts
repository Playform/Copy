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
export default async (
	Out: string,
	Raw: string[],
	Glob: string,
	Base: string,
	Verbose = false,
	Dry = false,
) => {
	for (const rawFrom of Raw) {
		// only support from dir like: /**/*(.ext)
		const { dir } = (await import("path")).parse(rawFrom);

		// be default, when ends with /*, glob doesnot expand directories
		// avoid use override option `expandDirectories` and use `/*`

		// if from path ends with /* like assets/* or assets/*.ext, we give a warning?
		if (!dir.endsWith("/**")) {
			Log(
				`The from path ${chalk.white(
					Raw,
				)} of current asset pair doesnot ends with ${chalk.white(
					"/**/*(.ext)",
				)}, `,
				Verbose,
			);
		}

		// only works for /**/*(.ext) pattern
		// ./assets/** → ./assets
		const startFragment = dir.replace("/**", "");

		// globbedFromPath: /PATH/TO/assets/foo.js → /foo.js
		// globbedFromPath: /PATH/TO/assets/nest/foo.js → /nest/foo.js
		const [, preservedDirStructure] = Glob.split(startFragment);

		// /PATH/TO/assets/foo.js
		// resolve seems to be unnecessary as globbed path is already absolute path
		const Source = resolve(Glob);

		const isToPathDir = (await import("path")).extname(Base) === "";

		const composedDistDirPath = isToPathDir
			? // /RESOLVE_FROM_DIR/SPECIFIED_TO_DIR/LEFT_FILE_STRUCTURE
				resolve(
					// base resolve destination dir
					Out,
					// configures destination dir
					Base,
					// internal dir structure, remove the first slash
					preservedDirStructure ? preservedDirStructure.slice(1) : "",
				)
			: resolve(
					// base resolve destination dir
					Out,
					// configures destination dir
					Base,
				);

		if (!Dry) {
			try {
				await (await import("fs/promises")).access(
					(await import("path")).dirname(composedDistDirPath),
					(await import("fs/promises")).constants.R_OK,
				);

				(await import("fs/promises")).copyFile(
					Source,
					composedDistDirPath,
				);
			} catch (_Error) {
				Log(String(_Error).toString(), Verbose);
			}
		}

		Log(
			`${Dry ? chalk.white("[DryRun] ") : ""}File copied: ${chalk.white(
				Source,
			)} -> ${chalk.white(composedDistDirPath)}`,
			Verbose,
		);
	}
};

import chalk from "chalk";

export const {
	default: { resolve },
} = await import("path");

export const { default: Log } = await import("@Function/Log.js");
