import type MaybeArray from "../Type/MaybeArray.js";

/**
 * @module Ensure
 *
 */
export default <T>(item: MaybeArray<T>): T[] => {
	return Array.isArray(item) ? item : [item];
};
