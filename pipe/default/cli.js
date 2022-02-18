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
			'pipe',
			waw.path
		]
	}).then(function () {
		//console.log('then', arguments);
	}).catch(function () {
		//console.log('catch', arguments);
	}).finally(function () {
		//console.log('finally', arguments);
		if (fs.existsSync(waw.base+'.pipe.spec.ts')) {
			fs.unlink(waw.base+'.pipe.spec.ts', (err) => {})
		}
		let ts = fs.readFileSync(waw.template+'/pipe.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base+'.pipe.ts', ts, 'utf8');
		let index = process.cwd() + '/src/app/pipes/index.ts';
		if (fs.existsSync(index)) {
			let index_exports = fs.readFileSync(index, 'utf8') || '';
			let code = "export { "+waw.Name+"Pipe } from './"+waw.name+".pipe';";
			if(index_exports.indexOf(code)==-1){
				index_exports += (index_exports.length&&"\n"||"")+code;
				fs.writeFileSync(index, index_exports, 'utf8');
			}
		}
		let config = fs.readFileSync(process.cwd() + '/src/app/core/core.module.ts', 'utf8');
		let search = '/* exports */';
		if(config && config.indexOf(search)>-1){
			config = config.replace(search, search+'\n\t\t'+waw.Name+'Pipe,');
			fs.writeFileSync(process.cwd() + '/src/app/core/core.module.ts', config, 'utf8');
		}
		console.log('Pipe has been created');
		process.exit(1);
	});
}
