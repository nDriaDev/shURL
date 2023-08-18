const fs = require('fs/promises');
const path = require('path');

const SPACEFILE_PATH = path.join(__dirname,'./../Spacefile');
const SPACEFILE_COPY_PATH = path.join(__dirname,'./../Spacefile.copy');
const ENV_DETASH_PATH = path.join(__dirname,'../be/config/.env.detash');

async function edit() {
    let spaceFile = await fs.readFile(SPACEFILE_PATH, {encoding: "utf8"}),
    env = await fs.readFile(ENV_DETASH_PATH, {encoding: "utf8"}),
	spaceFileSplitted = spaceFile.split("\n");
    env = env.split("\n");
	const envObj = {};
	for(let variable of env) {
		const key = variable.substring(0, variable.indexOf("="));
		const value = variable.substring(variable.indexOf("=")+1);
		envObj[key] = value;
	}
    await fs.writeFile(SPACEFILE_COPY_PATH, spaceFile, {encoding: "utf8"});

	for(let i=0, size=spaceFileSplitted.length; i<size; i++) {
		if(spaceFileSplitted[i].includes("- name:") && spaceFileSplitted[i+2] && spaceFileSplitted[i+2].includes("default: \"\"")) {
			const name = spaceFileSplitted[i].substring(spaceFileSplitted[i].indexOf(":")+1).trim();
			spaceFile = spaceFile.replace("default: \"\"", `default: "${envObj[name]}"`);
		}
    } 

	await fs.writeFile(SPACEFILE_PATH, spaceFile, {encoding: "utf8"});
}

edit();
