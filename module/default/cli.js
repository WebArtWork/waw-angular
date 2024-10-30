const exe = require("child_process").execSync;
const root = exe("npm root -g").toString().trim();
const path = require("path");
const fs = require("fs");
if (!fs.existsSync(root + "/@angular/cli")) {
	console.log(
		"You should install '@angular/cli' global. 'npm i -g @angular/cli'"
	);
	process.exit(1);
}

module.exports = async (waw) => {
	waw.base = waw.base.replace('modules', path.join('core', 'modules'));

	const response = await fetch(
		"https://webart.work/api/registry/ngx/module/" + waw.name
	);

	const resp = response.ok ? await response.json() : null;

	if (response.ok && resp) {
		if (resp.repo) {
			waw.fetch(
				waw.base,
				resp.repo,
				(err) => { },
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
		fs.mkdirSync(waw.base, {
			recursive: true,
		});

		waw.base = path.join(waw.base, waw.fileName);

		if (fs.existsSync(waw.base + ".component.css")) {
			fs.unlink(waw.base + ".component.css", (err) => { });
		}

		if (fs.existsSync(waw.base + ".component.spec.ts")) {
			fs.unlink(waw.base + ".component.spec.ts", (err) => { });
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
	}

	console.log("Module has been created");

	process.exit(1);
};
