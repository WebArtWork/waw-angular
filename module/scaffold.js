const path = require('node:path');
module.exports = async (waw) => {
	const replace = {
		CNAME: waw.Name,
		NAME: waw.name,
	}

	waw.ensureDir(waw.base, 'pages', waw.name + 's');
	waw.readWrite(path.join(__dirname, 'component.html'), path.join(waw.base, 'pages', waw.name + 's', waw.name + 's.component.html'), replace);
	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, 'pages', waw.name + 's', waw.name + 's.component.ts'), replace);
	waw.readWrite(path.join(__dirname, 'routes.ts'), path.join(waw.base, 'pages', waw.name + 's', waw.name + 's.routes.ts'), replace);

	waw.ensureDir(waw.base, 'forms');
	waw.readWrite(path.join(__dirname, 'form.ts'), path.join(waw.base, waw.name + '.form.ts'), replace);

	waw.ensureDir(waw.base, 'form-components', waw.name);
	waw.readWrite(path.join(__dirname, 'formcomponent.html'), path.join(waw.base, 'form-components', waw.name, waw.name + '.component.html'), replace);
	waw.readWrite(path.join(__dirname, 'formcomponent.ts'), path.join(waw.base, 'form-components', waw.name, waw.name + '.component.ts'), replace);

	waw.ensureDir(waw.base, 'services');
	waw.readWrite(path.join(__dirname, 'service.ts'), path.join(waw.base, 'services', waw.name + '.service.ts'), replace);

	waw.ensureDir(waw.base, 'interfaces');
	waw.readWrite(path.join(__dirname, 'interface.ts'), path.join(waw.base, 'interfaces', waw.name, waw.name + '.interface.ts'), replace);

	waw.ensureDir(waw.base, 'selectors', waw.name);
	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, 'selectors', waw.name, waw.name + '.component.ts'), replace);
	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, 'selectors', waw.name, waw.name + '.component.ts'), replace);

	console.log("Module has been created");

	process.exit();
};
