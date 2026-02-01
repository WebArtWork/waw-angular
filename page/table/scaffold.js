const path = require('node:path');
module.exports = async (waw) => {
	waw.ensureDir(waw.base, 'pages', waw.name);

	const replace = {
		CNAME: waw.Name,
		NAME: waw.name,
	}

	waw.readWrite(path.join(__dirname, 'component.html'), path.join(waw.base, 'pages', waw.name, waw.name + '.component.html'), replace);

	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, 'pages', waw.name, waw.name + '.component.ts'), replace);

	waw.readWrite(path.join(__dirname, 'routes.ts'), path.join(waw.base, 'pages', waw.name, waw.name + '.routes.ts'), replace);

	console.log("Page has been created");

	process.exit();
};
