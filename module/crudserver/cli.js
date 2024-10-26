const exe = require("child_process").execSync;
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

	const serviceName = "s" + waw.name.charAt(0).toLowerCase();

	const base = path.join(waw.base, "pages", waw.pageName, waw.pageName);

	let html = fs.readFileSync(waw.template + "/component.html", "utf8");
	html = html.split("SERVICENAME").join(serviceName);
	html = html.split("CSERVICE").join(waw.Name);
	html = html.split("SERVICE").join(waw.name);
	html = html.split("CNAME").join(waw.PageName);
	html = html.split("NAME").join(waw.pageName);
	fs.writeFileSync(base + ".component.html", html, "utf8");

	let scss = fs.readFileSync(waw.template + "/component.scss", "utf8");
	scss = scss.split("SERVICENAME").join(serviceName);
	scss = scss.split("CSERVICE").join(waw.Name);
	scss = scss.split("SERVICE").join(waw.name);
	scss = scss.split("CNAME").join(waw.PageName);
	scss = scss.split("NAME").join(waw.pageName);
	fs.writeFileSync(base + ".component.scss", scss, "utf8");

	let ts = fs.readFileSync(waw.template + "/component.ts", "utf8");
	ts = ts.split("FILENAME").join(waw.fileName);
	ts = ts.split("SERVICENAME").join(serviceName);
	ts = ts.split("CSERVICE").join(waw.Name);
	ts = ts.split("SERVICE").join(waw.name);
	ts = ts.split("CNAME").join(waw.PageName);
	ts = ts.split("NAME").join(waw.pageName);
	fs.writeFileSync(base + ".component.ts", ts, "utf8");

	let mod = fs.readFileSync(waw.template + "/module.ts", "utf8");
	mod = mod.split("FILENAME").join(waw.fileName);
	mod = mod.split("SERVICENAME").join(serviceName);
	mod = mod.split("CSERVICE").join(waw.Name);
	mod = mod.split("SERVICE").join(waw.name);
	mod = mod.split("CNAME").join(waw.PageName);
	mod = mod.split("NAME").join(waw.pageName);
	fs.writeFileSync(base + ".module.ts", mod, "utf8");

	console.log("Module has been created");

	process.exit(1);
};

module.exports = async (waw) => {
	const response = await fetch(
		"https://webart.work/api/registry/ngx/module/" + waw.name
	);
	let resp;
	if (response.ok) {
		resp = await response.json();
	}

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
		console.log("Module has been created");

		process.exit(1);
	} else {
		fs.mkdirSync(path.join(waw.base, "interfaces"), {
			recursive: true,
		});

		let int = fs.readFileSync(waw.template + "/interface.ts", "utf8");
		int = int.split("CNAME").join(waw.Name);
		int = int.split("NAME").join(waw.name);
		fs.writeFileSync(
			path.join(waw.base, "interfaces", waw.name + ".interface.ts"),
			int,
			"utf8"
		);

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

		finish(waw);
	}
};
