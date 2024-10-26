const fs = require("fs");
const path = require("path");

module.exports = async (waw) => {
	if (!fs.existsSync(waw.base)) {
		fs.mkdirSync(waw.base, { recursive: true });
	}

	let html = fs.readFileSync(waw.template + "/component.html", "utf8");
	html = html.split("CNAME").join(waw.Name);
	html = html.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".component.html", html, "utf8");

	let scss = fs.readFileSync(waw.template + "/component.scss", "utf8");
	scss = scss.split("CNAME").join(waw.Name);
	scss = scss.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".component.scss", scss, "utf8");

	let ts = fs.readFileSync(waw.template + "/component.ts", "utf8");
	ts = ts.split("FILENAME").join(waw.fileName);
	ts = ts.split("CNAME").join(waw.Name);
	ts = ts.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".component.ts", ts, "utf8");

	waw.add_code({
		file: process.cwd() + "/src/app/core/core.module.ts",
		search: "/* components */",
		replace: "/* components */\n\t" + waw.Name + "Component,",
	});

	waw.add_code({
		file: process.cwd() + "/src/app/core/core.module.ts",
		search: "/* imports */",
		replace: `/* imports */\nimport { ${waw.Name}Component } from './components/${waw.name}.component';`,
	});

	console.log("Component has been created");

	process.exit(1);
};
