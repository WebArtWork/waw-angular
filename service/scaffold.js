const path = require('node:path');
module.exports = async (waw) => {
	waw.ensureDir(waw.base);

	waw.readWrite(path.join(__dirname, 'service.ts'), path.join(waw.base, waw.name + '.service.ts'), {
		CNAME: waw.Name,
		NAME: waw.name,
	});

	console.log("Service has been created");

	process.exit();
};
