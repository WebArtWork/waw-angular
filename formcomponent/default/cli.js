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
				if (file) {
					fs.writeFileSync(
						path.join(waw.base, file),
						resp.files[file],
						"utf8"
					);
				}
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

	let fcConfig = path.join("src", "app", "app.formcomponents.ts");

	if (!fs.existsSync(fcConfig)) {
		fs.writeFileSync(
			fcConfig,
			fs.readFileSync(waw.template + "/app.formcomponents.ts", "utf8"),
			"utf8"
		);
	}

	waw.add_code({
		file: fcConfig,
		search: "/* componnets */",
		replace: `import { ${waw.Name}Component } from 'src/app/form-components/${waw.name}/${waw.name}.component';\n/* componnets */`,
	});

	waw.add_code({
		file: fcConfig,
		search: "/* addComponents */",
		replace: `${waw.Name}: ${waw.Name}Component,\n\t/* addComponents */`,
	});

	console.log("Form component has been created");

	process.exit(1);
};
