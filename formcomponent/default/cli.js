const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

module.exports = async (waw) => {
	fs.mkdirSync(waw.base, { recursive: true });

	const response = await fetch(
		"https://webart.work/api/registry/ngx/formcomponent/" + waw.name
	);
	const resp = response.ok ? await response.json() : null;

	if (response.ok && resp) {
		if (resp.repo) {
			waw.fetch(
				waw.base,
				resp.repo,
				(err) => {},
				resp.branch || "master"
			);
		} else {
			for (const file in resp.files) {
				if (file)
					fs.writeFileSync(
						path.join(waw.base, file),
						resp.files[file],
						"utf8"
					);
			}
		}
	} else {
		const base = path.join(waw.base, waw.fileName);

		let html = fs.readFileSync(waw.template + "/component.html", "utf8");
		html = html.split("CNAME").join(waw.Name);
		html = html.split("NAME").join(waw.name);
		fs.writeFileSync(base + ".component.html", html, "utf8");

		let scss = fs.readFileSync(waw.template + "/component.scss", "utf8");
		scss = scss.split("CNAME").join(waw.Name);
		scss = scss.split("NAME").join(waw.name);
		fs.writeFileSync(base + ".component.scss", scss, "utf8");

		let ts = fs.readFileSync(waw.template + "/component.ts", "utf8");
		ts = ts.split("FILENAME").join(waw.fileName);
		ts = ts.split("CNAME").join(waw.Name);
		ts = ts.split("NAME").join(waw.name);
		fs.writeFileSync(base + ".component.ts", ts, "utf8");
	}

	let fcModuleTs = path.normalize(waw.base).split(path.sep);
	fcModuleTs.pop();
	fcModuleTs = fcModuleTs.join(path.sep);
	fcModuleTs = path.join(fcModuleTs, "formcomponents.module.ts");

	if (!fs.existsSync(fcModuleTs)) {
		fs.writeFileSync(
			fcModuleTs,
			fs.readFileSync(waw.template + "/formcomponents.module.ts", "utf8"),
			"utf8"
		);
	}

	waw.add_code({
		file: fcModuleTs,
		search: "/* componnets */",
		replace: `/* componnets */\nimport { ${waw.Name}Component } from './${waw.name}/${waw.name}.component';`,
	});

	waw.add_code({
		file: fcModuleTs,
		search: "/* declarations */",
		replace: `/* declarations */\n\t\t${waw.Name}Component,`,
	});

	waw.add_code({
		file: fcModuleTs,
		search: "/* addComponents */",
		replace: `/* addComponents */\n\t\tthis._form.injectComponent<${waw.Name}Component>('${waw.Name}', ${waw.Name}Component);\n`,
	});

	console.log("Form component has been created");

	process.exit(1);
};
