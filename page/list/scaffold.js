const path = require('node:path');

module.exports = async (waw) => {
	const t = waw.terminal();

	const name = await t.ask(`Provide name for the page you want to generate:`, {
		required: true,
	});

	waw.pageName = name.toLowerCase();

	t.close();

	waw.PageName = waw.pageName[0].toUpperCase() + waw.pageName.slice(1, waw.pageName.length);
	const replace = {
		CROLE: waw.Name,
		ROLE: waw.name,
		CNAME: waw.PageName,
		NAME: waw.pageName,
	}

	waw.ensureDir(waw.base, waw.pageName);
	waw.readWrite(path.join(__dirname, 'component.html'), path.join(waw.base, waw.pageName, waw.pageName + '.component.html'), replace);
	waw.readWrite(path.join(__dirname, 'component.ts'), path.join(waw.base, waw.pageName, waw.pageName + '.component.ts'), replace);
	waw.readWrite(path.join(__dirname, 'routes.ts'), path.join(waw.base, waw.pageName, waw.pageName + '.routes.ts'), replace);
	waw.readWrite(path.join(__dirname, 'const.ts'), path.join(waw.base, waw.pageName, waw.pageName + '.const.ts'), replace);
	waw.readWrite(path.join(__dirname, 'interface.ts'), path.join(waw.base, waw.pageName, waw.pageName + '.interface.ts'), replace);
	waw.ensureDir(waw.base, waw.pageName, waw.pageName + '-item');
	waw.readWrite(path.join(__dirname, 'item.html'), path.join(waw.base, waw.pageName, waw.pageName + '-item', waw.pageName + '-item.component.html'), replace);
	waw.readWrite(path.join(__dirname, 'item.ts'), path.join(waw.base, waw.pageName, waw.pageName + '-item', waw.pageName + '-item.component.ts'), replace);

	const appRoutes = path.join(waw.projectPath, 'src/app/app.routes.ts');
	const replaceRoutes = {};
	replaceRoutes[`/* ${waw.name} */`] = `/* ${waw.name} */\n\t\t\t{\n\t\t\t\tpath: '${waw.pageName}',\n\t\t\t\tcanActivate: [MetaGuard],\n\t\t\t\tdata: {\n\t\t\t\t\tmeta: {\n\t\t\t\t\t\ttitle: '${waw.PageName}'\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tloadChildren: () => import('./pages/${waw.name}/${waw.pageName}/${waw.pageName}.routes').then(r => r.routes)\n\t\t\t}, `;
	waw.readWrite(appRoutes, appRoutes, replaceRoutes);

	console.log(`Page ${waw.pageName} has been created`);

	process.exit();
};
