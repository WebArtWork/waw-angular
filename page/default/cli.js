let angular;
try {
	const root = require('child_process').execSync('npm root -g').toString().trim();
	angular = require(root + '/@angular/cli');
} catch (err) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(1);
}
const fs = require('fs');
const path = require('path');
const capitalize = (string) => {
	return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}
module.exports = function(waw){
	waw.Name = '';
	waw.name = '';
	waw._argv.shift();
	waw.path = 'pages/' + waw._argv.shift() + '/';
	while (waw._argv.length) {
		const folder = waw._argv.shift();
		if (waw.Name) {
			waw.name = waw.name + '-' + folder;
			waw.Name = waw.Name + capitalize(folder);
		} else {
			waw.name = folder;
			waw.Name = folder;
		}
		if (waw._argv.length) {
			waw.path += folder + '/';
		} else {
			waw.path_base = waw.path + waw.name;
			waw.path += waw.Name;
		}
	}
	waw.base = path.join(process.cwd(), 'src/app', waw.path_base, waw.name);
	waw.module = path.join(waw.path_base, waw.name+'.module');
	waw.module = waw.module.split('\\').join('/');
	angular.default({
		cliArgs: [
			'generate',
			'module',
			waw.path
		]
	}).then(function () {
		//console.log('then', arguments);
	}).catch(function () {
		//console.log('catch', arguments);
	}).finally(function () {
		//console.log('finally', arguments);
		let html = fs.readFileSync(waw.template+'/component.html', 'utf8');
		html = html.split('CNAME').join(waw.Name);
		html = html.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base+'.component.html', html, 'utf8');
		let scss = fs.readFileSync(waw.template+'/component.scss', 'utf8');
		scss = scss.split('CNAME').join(waw.Name);
		scss = scss.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base+'.component.scss', scss, 'utf8');
		let ts = fs.readFileSync(waw.template+'/component.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base+'.component.ts', ts, 'utf8');
		let mod = fs.readFileSync(waw.template+'/module.ts', 'utf8');
		mod = mod.split('CNAME').join(waw.Name);
		mod = mod.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base+'.module.ts', mod, 'utf8');
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* '+waw.argv[1].split('/')[1]+' */',
			replace: '/* ' + waw.argv[1].split('/')[1] + " */\n\t\t\t{\n\t\t\t\tpath: '" + waw.name.replace('-', '/') + "',\n\t\t\t\tcanActivate: [MetaGuard],\n\t\t\t\tdata: {\n\t\t\t\t\tmeta: {\n\t\t\t\t\t\ttitle: '" + waw.Name + "'\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tloadChildren: () => import('./" + waw.module + "').then(m => m." + waw.Name +"Module)\n\t\t\t}, "
		});
		console.log('Page has been created');
		process.exit(1);
	});
}
