const fs = require("fs");
const path = require("path");
const exe = require("child_process").execSync;
const root = exe("npm root -g").toString().trim();
if (!fs.existsSync(root + "/@angular/cli")) {
	console.log(
		"You should install '@angular/cli' global. 'npm i -g @angular/cli'"
	);
	process.exit(0);
}

module.exports = async (waw) => {
	if (waw.argv.length < 2) {
		console.log("\x1b[33m%s\x1b[0m", "Please specify role");
		process.exit(0);
	}

	try {
		exe("ng g m " + waw.component);
	} catch (error) {
		// console.log('\x1b[33m%s\x1b[0m', "You probably should install or re-install node modules, try:");
		// console.log('\x1b[36m%s\x1b[0m', 'npm install');
		process.exit(0);
	}

	exe("ng g c " + waw.component);

	waw.base = path.join(waw.base, waw.fileName);

	if (fs.existsSync(waw.base + ".component.css")) {
		fs.unlink(waw.base + ".component.css", (err) => {});
	}

	if (fs.existsSync(waw.base + ".component.spec.ts")) {
		fs.unlink(waw.base + ".component.spec.ts", (err) => {});
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

	let mod = fs.readFileSync(waw.template + "/module.ts", "utf8");
	mod = mod.split("FILENAME").join(waw.fileName);
	mod = mod.split("CNAME").join(waw.Name);
	mod = mod.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".module.ts", mod, "utf8");

	waw.add_code({
		file: process.cwd() + "/src/app/app.module.ts",
		search: "/* " + waw.argv[0].split("/")[0] + " */",
		replace:
			"/* " +
			waw.argv[0].split("/")[0] +
			" */\n\t\t\t{\n\t\t\t\tpath: '" +
			waw.name +
			"',\n\t\t\t\tcanActivate: [MetaGuard],\n\t\t\t\tdata: {\n\t\t\t\t\tmeta: {\n\t\t\t\t\t\ttitle: '" +
			waw.Name +
			"'\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tloadChildren: () => import('./" +
			waw.fileComponent +
			"/" +
			waw.fileName +
			".module').then(m => m." +
			waw.Name +
			"Module)\n\t\t\t}, ",
	});

	console.log("Page has been created");

	process.exit(1);
};
