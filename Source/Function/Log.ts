export default (msg: string, verbose: boolean, lineBefore = false) => {
	if (!verbose) {
		return;
	}
	console.log(chalk.blue(lineBefore ? "\ni" : "i"), msg);
};
