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

	code = fs.readFileSync(waw.template + "/component.html", "utf8");
	code = code.split("PCNAME").join(waw.PageName);
	code = code.split("PNAME").join(waw.pageName);
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.html", code, "utf8");

	code = fs.readFileSync(waw.template + "/component.scss", "utf8");
	code = code.split("PCNAME").join(waw.PageName);
	code = code.split("PNAME").join(waw.pageName);
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.scss", code, "utf8");

	code = fs.readFileSync(waw.template + "/component.ts", "utf8");
	code = code.split("PCNAME").join(waw.PageName);
	code = code.split("PNAME").join(waw.pageName);
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".component.ts", code, "utf8");

	code = fs.readFileSync(waw.template + "/routes.ts", "utf8");
	code = code.split("PCNAME").join(waw.PageName);
	code = code.split("PNAME").join(waw.pageName);
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(base + ".routes.ts", code, "utf8");

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
			waw.pageName +
			"Routes)\n\t\t\t}, ",
	});

	console.log("Module has been created");

	process.exit(1);
};

module.exports = async (waw) => {
	/* Service */
	fs.mkdirSync(path.join(waw.base, "services"), {
		recursive: true,
	});

	let code = fs.readFileSync(waw.template + "/service.ts", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "services", waw.name + ".service.ts"),
		code,
		"utf8"
	);

	/* Interface */
	fs.mkdirSync(path.join(waw.base, "interfaces"), {
		recursive: true,
	});

	code = fs.readFileSync(waw.template + "/interface.ts", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "interfaces", waw.name + ".interface.ts"),
		code,
		"utf8"
	);

	/* Form */
	fs.mkdirSync(path.join(waw.base, "form", waw.name), {
		recursive: true,
	});

	code = fs.readFileSync(waw.template + "/form.ts", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "form", waw.name + ".form.ts"),
		code,
		"utf8"
	);

	code = fs.readFileSync(waw.template + "/formcomponent.html", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "form", waw.name, waw.name + ".formcomponent.html"),
		code,
		"utf8"
	);

	code = fs.readFileSync(waw.template + "/formcomponent.scss", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "form", waw.name, waw.name + ".formcomponent.scss"),
		code,
		"utf8"
	);

	code = fs.readFileSync(waw.template + "/formcomponent.ts", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(waw.base, "form", waw.name, waw.name + ".formcomponent.ts"),
		code,
		"utf8"
	);

	/* Selector */
	fs.mkdirSync(path.join(waw.base, "selectors", waw.name), {
		recursive: true,
	});

	code = fs.readFileSync(waw.template + "/selector.html", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(
			waw.base,
			"selectors",
			waw.name,
			waw.name + "-selector.component.html"
		),
		code,
		"utf8"
	);

	code = fs.readFileSync(waw.template + "/selector.scss", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(
			waw.base,
			"selectors",
			waw.name,
			waw.name + "-selector.component.scss"
		),
		code,
		"utf8"
	);

	code = fs.readFileSync(waw.template + "/selector.ts", "utf8");
	code = code.split("CNAME").join(waw.Name);
	code = code.split("NAME").join(waw.name);
	fs.writeFileSync(
		path.join(
			waw.base,
			"selectors",
			waw.name,
			waw.name + "-selector.component.ts"
		),
		code,
		"utf8"
	);

	finish(waw);
};
