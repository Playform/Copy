export default (assets: MaybeArray<AssetPair>) => {
	return Ensure(assets)
		.filter((asset) => asset.from && asset.to)
		.map(({ from, to, watch }) => ({
			from: Ensure(from),
			to: Ensure(to),
			watch: watch ?? false,
		}));
};

export const { default: Ensure } = await import("@Function/Ensure.js");
