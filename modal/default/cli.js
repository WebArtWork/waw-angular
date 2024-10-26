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
	try {
		exe("ng g c " + waw.component);
	} catch (error) {
		console.log(
			"\x1b[33m%s\x1b[0m",
			"You probably should install or re-install node modules, try:"
		);
		console.log("\x1b[36m%s\x1b[0m", "npm install");
		process.exit(0);
	}

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

	waw.add_code({
		file: process.cwd() + "/src/app/app.module.ts",
		search: "/* modals */",
		replace:
			"/* modals */\n\t\t\t\t\t" +
			waw.name +
			": " +
			waw.Name +
			"Component,",
	});

	console.log("Modal has been created");

	process.exit(1);
};
