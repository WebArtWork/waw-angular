const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

module.exports = async (waw) => {
	let iconsModuleTs = path.normalize(waw.base).split(path.sep);
	iconsModuleTs.pop();
	iconsModuleTs = iconsModuleTs.join(path.sep);
	iconsModuleTs = path.join(iconsModuleTs, 'icons.module.ts');

	fs.mkdirSync(waw.base, { recursive: true });

	if (!fs.existsSync(iconsModuleTs)) {
		fs.writeFileSync(
			iconsModuleTs,
			fs.readFileSync(waw.template + "/icons.module.ts",
			"utf8"
		), 'utf8');
	}

	waw.add_code({
		file: process.cwd() + '/src/app/core/icons/icons.module.ts',
		search: '/* icons */',
		replace: "/* icons */\n\t" + waw.Name + "Component,"
	});

	waw.add_code({
		file: process.cwd() + '/src/app/core/icons/icons.module.ts',
		search: `import { NgModule } from '@angular/core';`,
		replace: `import { NgModule } from '@angular/core';\nimport { ${waw.Name}Component } from './${waw.name}/${waw.name}.component';`
	});

	const response = await fetch(
		"https://webart.work/api/registry/icon/" + waw.name
	);

	if (response.ok) {
		const files = await response.json();

		for (const file in files) {
			fs.writeFileSync(path.join(waw.base, file), files[file], 'utf8');
		}
	} else {
		waw.base = path.join(waw.base, waw.fileName);

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
	}

	console.log("Icon has been created");

	process.exit(1);
};
