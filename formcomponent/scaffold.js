const path = require('node:path');
module.exports = async (waw) => {
	waw.ensureDir(waw.base);

	waw.readWrite(path.join(__dirname, 'component.html'), path.join(waw.base, waw.name + '.component.html'), {
		CNAME: waw.Name,
		NAME: waw.name,
	});

	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, waw.name + '.component.ts'), {
		CNAME: waw.Name,
		NAME: waw.name,
	});


	const fcConfig = path.join(waw.projectPath, "src", "app", "app.formcomponents.ts");

	if (!waw.exists(fcConfig)) {
		waw.readWrite(
			path.join(__dirname, 'app.formcompnents.html'),
			fcConfig
		);
	}

	waw.readWrite(fcConfig, fcConfig, {
		"/* componnets */": `import { ${waw.Name}Component } from 'src/app/form-components/${waw.name}/${waw.name}.component';\n/* componnets */`,
		"/* addComponents */": `${waw.Name}: ${waw.Name}Component,\n\t/* addComponents */`,
	});

	console.log("Form component has been created");

	process.exit(0);
};
