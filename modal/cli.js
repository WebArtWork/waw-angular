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
			'component',
			waw.path
		]
	}).then(function () {
		//console.log('then', arguments);
	}).catch(function () {
		//console.log('catch', arguments);
	}).finally(function () {
		//console.log('finally', arguments);
		let html = waw.fs.readFileSync(waw.params.template+'/component.html', 'utf8');
		html = html.split('CNAME').join(waw.Name);
		html = html.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.html', html, 'utf8');
		let scss = waw.fs.readFileSync(waw.params.template+'/component.scss', 'utf8');
		scss = scss.split('CNAME').join(waw.Name);
		scss = scss.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.scss', scss, 'utf8');
		let ts = waw.fs.readFileSync(waw.params.template+'/component.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* modals */',
			replace: "/* modals */\n\t\t\t" + waw.name + ": " + waw.Name + "Component,"
		});
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* entryComponents */',
			replace: "/* entryComponents */\n\t\t" + waw.Name + "Component,"
		});
		waw.fs.writeFileSync(waw.base+'.component.ts', ts, 'utf8');
		console.log('Modal has been created');
		process.exit(1);
	});
}