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
	if (
		Array.isArray(waw._argv) &&
		waw._argv.length > 3
	) {
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
	}
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
	console.log('this is the end');
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
			replace: '/* '+waw.argv[1].split('/')[1]+" */{\n\t\tpath: '"+waw.name+"',\n\t\tcanActivate: [MetaGuard],\n\t\tdata: {\n\t\t\tmeta: {\n\t\t\t\ttitle: '"+waw.Name+"'\n\t\t\t}\n\t\t},\n\t\tloadChildren: () => import('./"+waw.path+'/'+waw.name+".module').then(m => m."+waw.Name+"Module)\n\t}, "
		});
		console.log('Page has been created');
		process.exit(1);
	});
}
