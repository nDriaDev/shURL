const fs = require("fs/promises");
const path = require("path");

const PATHS = {
	BE: path.join(__dirname, "..", "be"),
	ENV_SPACE: path.join(__dirname, "..", "be", "config", ".env.detash"),
	TEMP_FILE: path.join(__dirname, "temp.json")
};
const ENV_VARS = {};

/**
 * Recursive function to get files list in __filePath__ and to save them into __FILES_PATH__.
 * @param {string} filePath 
 * @param {string[]} FILES_PATH 
 */
async function internalSet(filePath, FILES_PATH) {
	!filePath && (filePath = PATHS.BE); 
	const beFiles = await fs.readdir(filePath ?? PATHS.BE);
	const promises = [];
	for(const file of beFiles) {
		if(file.endsWith(".js")) {
			const pathFile = path.join(filePath, file);
			FILES_PATH.push(pathFile);
		} else if(file !== "node_modules" && !file.includes(".")) {
			promises.push(internalSet(path.join(filePath, file), FILES_PATH));
		}
	}
	await Promise.all(promises)
}

/**
 * Function to set env vars into BE project
 */
async function set() {
	const TEMP_FILE = [];
	const FILES_PATH = [];
	await internalSet(null, FILES_PATH);
	for(const filePath of FILES_PATH) {
		const readFile = await fs.readFile(filePath, {encoding: "utf8"});
		let hasChange = false;
		for(const keyVar in ENV_VARS) {
			if(readFile.includes(`process.env.${keyVar}`)) {
				hasChange = true;
				const indexFile = TEMP_FILE.findIndex(el => el.path === filePath);
				const varValue = {
					env: `process.env.${keyVar}`,
					value: ENV_VARS[keyVar]
				};
				if(indexFile !== -1) {
					TEMP_FILE[indexFile].varsValues.push(varValue);
				} else {
					TEMP_FILE.push({
						path: filePath,
						varsValues: [varValue]
					})
				}
				readFile.replaceAll(`process.env.${keyVar}`, ENV_VARS[keyVar]);
			}
		}
		hasChange && await fs.writeFile(filePath, readFile, {encoding: "utf8"});
	}
	await fs.writeFile(PATHS.TEMP_FILE, JSON.stringify(TEMP_FILE,null,4), {encoding: "utf8"});
}

/**
 * Function to reset env vars into BE project
 */
async function reset() {
	const TEMP_FILE = JSON.parse(await fs.readFile(PATHS.TEMP_FILE, {encoding: "utf8"}));
	for (const file of TEMP_FILE) {
		const readFile = await fs.readFile(file.path, {encoding: "utf8"});
		for(const varValue of file.varsValues) {
			readFile.replaceAll(varValue.value, varValue.env);
		}
		await fs.writeFile(file.path, readFile, {encoding: "utf8"});
	}
	await fs.unlink(PATHS.TEMP_FILE);
}

/**
 * Function that gets param from command line to know which method executing: _set_ or _reset_.
 */
async function run() {
	const mode = process.argv[2];
	if(!mode) {
		console.error("No mode param provided.");
		process.exit();
	}

	const envs = await fs.readFile(PATHS.ENV_SPACE, {encoding: "utf8"});
	envs.split("\n").forEach(line => {
		const lineSplitted = line.split("=");
		lineSplitted[0] && (ENV_VARS[lineSplitted[0]] = lineSplitted[1]);
	});

	mode === "set"
		? await set()
		: await reset();
	process.exit();
}

run();
