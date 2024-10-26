const path = require("path");
const fs = require("fs");

module.exports = async (waw) => {
	const folder = path.join(process.cwd(), "src", "app", waw.folder);
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}

	let ts = fs.readFileSync(waw.template + "/pipe.ts", "utf8");
	ts = ts.split("CNAME").join(waw.Name);
	ts = ts.split("NAME").join(waw.name);
	fs.writeFileSync(waw.base + ".pipe.ts", ts, "utf8");

	waw.add_code({
		file: process.cwd() + "/src/app/core/core.module.ts",
		search: "/* pipes */",
		replace: "/* pipes */\n\t" + waw.Name + "Pipe,",
	});

	waw.add_code({
		file: process.cwd() + "/src/app/core/core.module.ts",
		search: "/* imports */",
		replace: `/* imports */\nimport { ${waw.Name}Pipe } from './pipes/${waw.name}.pipe';`,
	});

	console.log("Pipe has been created");

	process.exit(1);
};
