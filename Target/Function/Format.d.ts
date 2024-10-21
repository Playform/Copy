import type AssetPair from "../Interface/AssetPair.js";
import type MaybeArray from "../Type/MaybeArray.js";
/**
 * @module Format
 *
 */
declare const _default: (Asset: MaybeArray<AssetPair>) => {
    from: string[];
    to: string[];
}[];
export default _default;
export declare const Ensure: <T>(item: MaybeArray<T>) => T[];
