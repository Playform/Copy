# ©️ [Copy] —

ESBuild plugin for assets copy.

-   [Author](https://github.com/linbudu599)
-   [GitHub Repo](https://github.com/LinbuduLab/esbuild-plugins/tree/master/packages/@playform/copy#readme)
-   [Changelog](https://github.com/LinbuduLab/esbuild-plugins/blob/main/packages/@playform/copy/CHANGELOG.md)

## Feature

-   Keep copied assets file structure
-   Control assets destination path freely
-   Support verbose output log
-   Run only once or only when assets changed

## 🚀 Installation

```sh
npm install -D -E @playform/copy
```

## 🛠️ Usage

```ts
import { build } from "esbuild";
import { copy } from "@playform/copy";

(async () => {
	const res = await build({
		entryPoints: ["./src/main.ts"],
		bundle: true,
		outfile: "./dist/main.js",
		plugins: [
			Copy({
				// this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
				// if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
				Resolve: "Current",
				Asset: {
					from: ["./assets/*"],
					to: ["./assets", "./tmp-assets"],
				},
			}),
		],
	});
})();
```

### Keep

```ts
import Copy from "@playform/copy";
import { build } from "esbuild";

(async () => {
	const res = await build({
		entryPoints: ["./src/index.ts"],
		bundle: true,
		// as Resolve not set, we use dist as output base dir
		outfile: "./dist/main.js",
		plugins: [
			Copy({
				assets: [
					{
						from: ["./node_modules/tinymce/skins/**/*"],
						to: ["./dest/skins"],
					},
				],
			}),
		],
	});
})();
```

File structure will be kept:

```sh
|-node_modules/tinymce/skins
|--- content
|----- dark
|----- default
|----- document
|--- ui
|----- oxide
|----- oxide-dark
```

```sh
|- dist/dest/skins
|--- content
|----- dark
|----- default
|----- document
|--- ui
|----- oxide
|----- oxide-dark
```

You can also use patterns with extension names like `./path/**/*.js`.

### Glob

Note: This plugin doesnot expand directories by default, which means when you're
using pattern `dir/*` or `dir/*.*` , you will only get the file inside `dir/`
like `dir/index.md`. If you want to match the nested files like
`dir/path/to/index.md`, you will need to use pattern like `dir/**/*`.

If you're using `dir/*` and there are no files under this directory, you will
got an warning:

```sh
i No files matched using current glob pattern: ./node_modules/tinymce/skins/*, maybe you need to configure globby by options.globbyOptions?
```

## Configuration

```ts
import type { GlobbyOptions } from "globby";

export type MaybeArray<T> = T | T[];

// file/folder/globs
export interface AssetPair {
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

export interface Options {
	/**
	 * assets pair to copy
	 *
	 * @default []
	 */
	assets: MaybeArray<AssetPair>;

	/**
	 * execute copy in `ESBuild.onEnd` hook(recommended)
	 *
	 * set to true if you want to execute in onStart hook
	 *
	 * @default false
	 */
	copyOnStart: boolean;

	/**
	 * enable verbose logging
	 *
	 * outputs from-path and to-path finally passed to `fs.copyFileSync` method
	 *
	 * @default false
	 */
	verbose: boolean;

	/**
	 * options passed to `globby` when we 're globbing for files to copy
	 *
	 * @default {}
	 */
	globbyOptions: GlobbyOptions;

	/**
	 * only execute copy operation once
	 *
	 * @default false
	 */
	Once: boolean;

	/**
	 * base path used to resolve relative `assets.to` path
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
```

[Copy]: HTTPS://NPMJS.Org/@playform/copy

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this component.
