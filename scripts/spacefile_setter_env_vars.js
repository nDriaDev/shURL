const fs = require("fs/promises");
const path = require("path");

const PATHS = {
	DEPLOY: path.join(__dirname, "..", "deploy"),
	ENV_SPACE: path.join(__dirname, "..", "be", "config", ".env.detash"),
};
const ENV_VARS = {};

/**
 * Recursive function to get files list in __filePath__ and to save them into __FILES_PATH__.
 * @param {string} filePath 
 * @param {string[]} FILES_PATH 
 */
async function internalSet(filePath, FILES_PATH) {
	!filePath && (filePath = PATHS.DEPLOY); 
	const beFiles = await fs.readdir(filePath ?? PATHS.DEPLOY);
	const promises = [];
	for(const file of beFiles) {
		if(file.endsWith(".js")) {
			const pathFile = path.join(filePath, file);
			FILES_PATH.push(pathFile);
		} else if(file !== "client" && !file.includes(".")) {
			promises.push(internalSet(path.join(filePath, file), FILES_PATH));
		}
	}
	await Promise.all(promises)
}

/**
 * Function to set env vars into DEPLOY directory
 */
async function set() {
	const FILES_PATH = [];
	await internalSet(null, FILES_PATH);
	for(const filePath of FILES_PATH) {
		let readFile = await fs.readFile(filePath, {encoding: "utf8"});
		let hasChange = false;
		for(const keyVar in ENV_VARS) {
			if(readFile.includes(`process.env.${keyVar}`)) {
				hasChange = true;
				readFile = readFile.replaceAll(`process.env.${keyVar}`, `'${ENV_VARS[keyVar]}'`);
			}
		}
		hasChange && await fs.writeFile(filePath, readFile, {encoding: "utf8"});
	}
}

async function run() {
	const envs = await fs.readFile(PATHS.ENV_SPACE, {encoding: "utf8"});
	envs.split("\n").forEach(line => {
		const lineSplitted = line.split("=");
		lineSplitted[0].trim() && (ENV_VARS[lineSplitted[0].trim()] = lineSplitted[1].trim());
	});
	await set();
	process.exit();
}

run();
