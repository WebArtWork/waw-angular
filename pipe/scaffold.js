const path = require('node:path');
module.exports = async (waw) => {
	waw.ensureDir(waw.base);

	waw.readWrite(path.join(__dirname, 'pipe.ts'), path.join(waw.base, waw.name + '.pipe.ts'), {
		CNAME: waw.Name,
		NAME: waw.name,
	});

	console.log("Pipe has been created");

	process.exit();
};
