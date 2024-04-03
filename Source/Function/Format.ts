/**
 * @module Format
 *
 */
export default (Asset: MaybeArray<AssetPair>) => {
	return Ensure(Asset)
		.filter((Asset) => Asset.from && Asset.to)
		.map(({ from, to }) => ({
			from: Ensure(from),
			to: Ensure(to),
		}));
};

import type AssetPair from "@Interface/AssetPair.js";

import type MaybeArray from "@Type/MaybeArray.js";

export const { default: Ensure } = await import("@Function/Ensure.js");
