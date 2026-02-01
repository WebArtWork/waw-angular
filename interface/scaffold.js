const path = require('node:path');
module.exports = async (waw) => {
	waw.ensureDir(waw.base);

	waw.readWrite(path.join(__dirname, 'interface.ts'), path.join(waw.base, waw.name + '.interface.ts'), {
		CNAME: waw.Name,
		NAME: waw.name,
	});

	console.log("Interface has been created");

	process.exit(0);
};
