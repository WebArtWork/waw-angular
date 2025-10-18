const fs = require("fs");
const path = require("path");

module.exports = async (waw) => {
	const folder = path.join(process.cwd(), "src", "app", waw.folder);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}

	let ts = fs.readFileSync(waw.template + "/service.ts", "utf8");
	ts = ts.split("CNAME").join(waw.Name);
	ts = ts.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".service.ts", ts, "utf8");

	console.log("Service has been created");

	process.exit(1);
};
