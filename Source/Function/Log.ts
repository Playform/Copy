/**
 * @module Log
 *
 */
export default async (Message: string, Verbose: boolean, Before = false) => {
	if (!Verbose) {
		return;
	}

	console.log(
		(await import("chalk")).default.blue(Before ? "\ni" : "i"),
		Message,
	);
};
