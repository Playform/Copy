/**
 * @module Ensure
 *
 */
export default <T>(item: MaybeArray<T>): Array<T> => {
	return Array.isArray(item) ? item : [item];
};

import type MaybeArray from "@Type/MaybeArray.js";
