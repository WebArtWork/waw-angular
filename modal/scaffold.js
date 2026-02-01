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

	console.log("Modal has been created");

	process.exit(0);
};
