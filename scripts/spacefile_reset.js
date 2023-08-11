const fs = require('fs/promises');
const path = require('path');

const SPACEFILE_PATH = path.join(__dirname,'./../Spacefile');
const SPACEFILE_COPY_PATH = path.join(__dirname,'./../Spacefile.copy');
const ENV_DETASH_PATH = path.join(__dirname,'./../be/config/.env.detash');

async function reset() {
    let spaceFile = await fs.readFile(SPACEFILE_COPY_PATH, {encoding: "utf-8"});
    await fs.writeFile(SPACEFILE_PATH, spaceFile, {encoding: "utf-8"});
	await fs.rm(SPACEFILE_COPY_PATH, {force:true});
}

reset();
