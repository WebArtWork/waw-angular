let angular;
try {
	const root = require('child_process').execSync('npm root -g').toString().trim();
	angular = require(root + '/@angular/cli');
} catch (err) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(1);
}
const fs = require('fs');
module.exports = function(waw){

	console.log(waw.component);
	console.log(waw.base);
	process.exit(1);

	angular.default({
		cliArgs: [
			'generate',
			'component',
			waw.base
		]
	}).then(function () {
		console.log('then', arguments);
	}).catch(function () {
		console.log('catch', arguments);
	}).finally(function () {
		console.log('finally', arguments);
		process.exit(1);

		if (fs.existsSync(waw.component+'.component.css')) {
			fs.unlink(waw.component+'.component.css', (err) => {})
		}
		if (fs.existsSync(waw.component+'.component.spec.ts')) {
			fs.unlink(waw.component+'.component.spec.ts', (err) => {})
		}
		let html = fs.readFileSync(waw.template+'/component.html', 'utf8');
		html = html.split('CNAME').join(waw.Name);
		html = html.split('NAME').join(waw.name);
		fs.writeFileSync(waw.component+'.component.html', html, 'utf8');
		let scss = fs.readFileSync(waw.template+'/component.scss', 'utf8');
		scss = scss.split('CNAME').join(waw.Name);
		scss = scss.split('NAME').join(waw.name);
		fs.writeFileSync(waw.component+'.component.scss', scss, 'utf8');
		let ts = fs.readFileSync(waw.template+'/component.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		fs.writeFileSync(waw.component+'.component.ts', ts, 'utf8');
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* alerts */',
			replace: "/* alerts */\n\t\t\t\t\t" + waw.name + ": " + waw.Name + "Component,"
		});
		console.log('Alert has been created');
		process.exit(1);
	});
}
