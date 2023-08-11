const fs = require('fs/promises');
const path = require('path');

async function parse() {
    let spaceFile = await fs.readFile(path.join(__dirname,'./../Spacefile'), {encoding: "utf8"}),
    envName = spaceFile.split("\n").filter(el => !el.includes("- name: deploy") && el.includes("- name: ")).map(el => el.substring(el.indexOf((":"))+1).trim());
    envNameIndex = 0,
    defaultIndex = spaceFile.indexOf("default: \"\""),
    env = await fs.readFile(path.join(__dirname,'./../be/config/.env.detash'), {encoding: "utf8"});
    env = env.split("\n");

    while( defaultIndex !== -1 ) {
        let value = env.find(el => el.includes(envName[envNameIndex]));
        value = value.split("=")[1];
        spaceFile = spaceFile.replace("default: \"\"", "default: "+value);
        defaultIndex = spaceFile.indexOf("default: \"\"");
        envNameIndex++;
    } 
    console.log(spaceFile);
}

parse();