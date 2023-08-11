const fs = require('fs');

const IMPORT = {
	REGEX: /import\s(?<varName>.+)\sfrom(\s|)(?<libName>.+);/gm,
	REPLACE: "const $<varName> = require($<libName>);"
}
const CONST_AS = {
	REGEX: /(const\s\*\sas\s)(?<varName>.+)/gm,
	REPLACE: "const $<varName>"	
}
const REMOVE_REQUIRE = {
	REGEX: /(const\srequire|(.*)createRequire)(.*)/gm,
	REPLACE: ""
}
const DIR_FILE_NAME = {
	REGEX: /(const\s__dirname|const\s__filename)(.+)/gm,
	REPLACE: ""
}
const EXPORT = {
	REGEX: /export default (?<var>.+)/gm,
	REPLACE: "module.exports = $<var>"
};
const BE_PATH = './';
const OUTPUT_PATH= './../deta_micro/';

const EXCLUDE_REGEX = /(.+\.(prod|env|dev))|(node_modules)/g;

function transpile() {
	generateCommonJs(BE_PATH);
}
function generateCommonJs(PATH) {
	try {
		fs.readdirSync(PATH).forEach(file => {
			let path = PATH.length>BE_PATH.length ? PATH.substring(BE_PATH.length,PATH.length) : "";
			if(!EXCLUDE_REGEX.test(file)) {
				if(fs.existsSync(PATH+file) && fs.lstatSync(PATH+file).isDirectory()) {
					fs.mkdirSync(OUTPUT_PATH+path+file);
					generateCommonJs(PATH+file+'/');
				} else {
					let buffer = fs.readFileSync(PATH+file);
					let content = buffer.toString();
					if(file.includes("package.json")) {
						let splitted = content.split("\n");
						let indexMin = splitted.findIndex(el => el.includes("engine"));
						let indexMax = splitted.findIndex(el => el.includes("},"));
						splitted = splitted.filter((el,index) => index < indexMin || index > indexMax);
						splitted.splice(splitted.findIndex(el => el.includes("type")), 1);
						let mainIndex = splitted.findIndex(el => el.includes("main"));
						splitted[mainIndex] = splitted[mainIndex].replace("app.js", "index.js");
						content = splitted.join("\n");
					} else {
						content = content.replaceAll(IMPORT.REGEX, IMPORT.REPLACE);
						content = content.replaceAll(CONST_AS.REGEX, CONST_AS.REPLACE);
						content = content.replaceAll(REMOVE_REQUIRE.REGEX, REMOVE_REQUIRE.REPLACE);
						content = content.replaceAll(DIR_FILE_NAME.REGEX, DIR_FILE_NAME.REPLACE);
						content = content.replaceAll(EXPORT.REGEX, EXPORT.REPLACE);
					}
					let filename = file === 'app.js' ? 'index.js' : file;					
					fs.writeFileSync(OUTPUT_PATH+path+filename, content);
				}
			}
		})
	} catch (e) {
		throw e;
	}
};

transpile();
