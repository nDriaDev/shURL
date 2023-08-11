const fs = require('fs/promises');
const path = require('path');

const SPACEFILE_PATH = path.join(__dirname,'./../Spacefile');
const SPACEFILE_COPY_PATH = path.join(__dirname,'./../Spacefile.copy');
const ENV_DETASH_PATH = path.join(__dirname,'./../be/config/.env.detash');

async function edit() {
    let spaceFile = await fs.readFile(SPACEFILE_PATH, {encoding: "utf-8"}),
	spaceFileSplitted = spaceFile.split("\n");
    envName = spaceFileSplitted.filter(el => !el.includes("- name: deploy") && el.includes("- name: ")).map(el => el.substring(el.indexOf((":"))+1).trim());
    env = await fs.readFile(ENV_DETASH_PATH, {encoding: "utf-8"});
    env = env.split("\n");
    await fs.writeFile(SPACEFILE_COPY_PATH, spaceFile, {encoding: "utf-8"});

    for(let i=0, size=spaceFileSplitted.length; i<size; i++) {
		if(spaceFileSplitted[i].includes("- name:") && spaceFileSplitted[i+2] && spaceFileSplitted[i+2].includes("default: \"\"")) {
			const name = spaceFileSplitted[i].substring(spaceFileSplitted[i].indexOf(":")+1).trim();
			const value = env.find(el => el.includes(name))?.substring(name.length+1).trim();
			spaceFile = spaceFile.replace("default: \"\"", `default: "${value}"`);
		}
    } 
    await fs.writeFile(SPACEFILE_PATH, spaceFile, {encoding: "utf-8"});
}

edit();
