var angular;
try {
	const root = require('child_process').execSync('npm root -g').toString().trim();
	angular = require(root + '/@angular/cli');
} catch (err) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(1);
}
const fs = require('fs');
module.exports = function(waw){
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
		if (fs.existsSync(waw.base+'.component.css')) {
			fs.unlink(waw.base+'.component.css', (err) => {})
		}
		if (fs.existsSync(waw.base+'.component.spec.ts')) {
			fs.unlink(waw.base+'.component.spec.ts', (err) => {})
		}
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
