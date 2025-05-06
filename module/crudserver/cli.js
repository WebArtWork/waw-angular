const path = require("path");
const fs = require("fs");

const finish = (waw) => {
	if (!waw.pageName) {
		waw.readline.question("Provide page name: ", (pageName) => {
			if (pageName) {
				waw.pageName = pageName.toLowerCase();
				waw.PageName =
					waw.pageName[0].toUpperCase() +
					waw.pageName.slice(1, waw.pageName.length);
			}

			finish(waw);
		});

		return;
	}

	fs.mkdirSync(path.join(waw.base, "pages", waw.pageName), {
		recursive: true,
	});

	const base = path.join(waw.base, "pages", waw.pageName, waw.pageName);

	let html = fs.readFileSync(waw.template + "/component.html", "utf8");
	html = html.split("PCNAME").join(waw.PageName);
	html = html.split("PNAME").join(waw.pageName);
	html = html.split("CNAME").join(waw.Name);
	html = html.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.html", html, "utf8");

	let scss = fs.readFileSync(waw.template + "/component.scss", "utf8");
	scss = scss.split("PCNAME").join(waw.PageName);
	scss = scss.split("PNAME").join(waw.pageName);
	scss = scss.split("CNAME").join(waw.Name);
	scss = scss.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.scss", scss, "utf8");

	let ts = fs.readFileSync(waw.template + "/component.ts", "utf8");
	ts = ts.split("PCNAME").join(waw.PageName);
	ts = ts.split("PNAME").join(waw.pageName);
	ts = ts.split("CNAME").join(waw.Name);
	ts = ts.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.ts", ts, "utf8");

	ts = fs.readFileSync(waw.template + "/routes.ts", "utf8");
	ts = ts.split("PCNAME").join(waw.PageName);
	ts = ts.split("PNAME").join(waw.pageName);
	ts = ts.split("CNAME").join(waw.Name);
	ts = ts.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".routes.ts", ts, "utf8");

	waw.add_code({
		file: process.cwd() + "/src/app/app.module.ts",
		search: "/* user */",
		replace:
			"/* user */\n\t\t\t{\n\t\t\t\tpath: '" +
			waw.pageName +
			"',\n\t\t\t\tcanActivate: [MetaGuard],\n\t\t\t\tdata: {\n\t\t\t\t\tmeta: {\n\t\t\t\t\t\ttitle: '" +
			waw.PageName +
			"'\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tloadChildren: () => import('./modules/" +
			waw.name +
			"/pages/" +
			waw.pageName +
			"/" +
			waw.pageName +
			".routes').then(r => r." +
			waw.PageName +
			"Routes)\n\t\t\t}, ",
	});

	console.log("Module has been created");

	process.exit(1);
};

module.exports = async (waw) => {
	const response = await fetch(
		"https://webart.work/api/registry/ngx/module/" + waw.name
	);

	const resp = response.ok ? await response.json() : null;

	if (resp) {
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
		console.log("Module has been created");

		process.exit();
	} else {
		fs.mkdirSync(path.join(waw.base, "services"), {
			recursive: true,
		});

		let ts = fs.readFileSync(waw.template + "/service.ts", "utf8");
		ts = ts.split("CNAME").join(waw.Name);
		ts = ts.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(waw.base, "services", waw.name + ".service.ts"),
			ts,
			"utf8"
		);

		fs.mkdirSync(path.join(waw.base, "interfaces"), {
			recursive: true,
		});

		ts = fs.readFileSync(waw.template + "/interface.ts", "utf8");
		ts = ts.split("CNAME").join(waw.Name);
		ts = ts.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(waw.base, "interfaces", waw.name + ".interface.ts"),
			ts,
			"utf8"
		);

		fs.mkdirSync(path.join(waw.base, "formcomponents"), {
			recursive: true,
		});

		ts = fs.readFileSync(waw.template + "/formcomponents.ts", "utf8");
		ts = ts.split("CNAME").join(waw.Name);
		ts = ts.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(
				waw.base,
				"formcomponents",
				waw.name + ".formcomponents.ts"
			),
			ts,
			"utf8"
		);

		fs.mkdirSync(path.join(waw.base, "selectors", waw.name), {
			recursive: true,
		});

		let html = fs.readFileSync(waw.template + "/selector.html", "utf8");
		html = html.split("CNAME").join(waw.Name);
		html = html.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(
				waw.base,
				"selectors",
				waw.name,
				waw.name + "-selector.component.html"
			),
			html,
			"utf8"
		);

		let scss = fs.readFileSync(waw.template + "/selector.scss", "utf8");
		scss = scss.split("CNAME").join(waw.Name);
		scss = scss.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(
				waw.base,
				"selectors",
				waw.name,
				waw.name + "-selector.component.scss"
			),
			scss,
			"utf8"
		);

		ts = fs.readFileSync(waw.template + "/selector.ts", "utf8");
		ts = ts.split("CNAME").join(waw.Name);
		ts = ts.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(
				waw.base,
				"selectors",
				waw.name,
				waw.name + "-selector.component.ts"
			),
			ts,
			"utf8"
		);

		finish(waw);
	}
};
