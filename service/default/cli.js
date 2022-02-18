const fs = require('fs');
module.exports = function(waw){
	if (fs.existsSync(waw.base+'.service.spec.ts')) {
		fs.unlink(waw.base+'.service.spec.ts', (err) => {})
	}
	let ts = fs.readFileSync(waw.template+'/service.ts', 'utf8');
	ts = ts.split('CNAME').join(waw.Name);
	ts = ts.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base+'.service.ts', ts, 'utf8');
	const index = process.cwd() + '/src/app/services/index.ts';
	if (fs.existsSync(index)) {
		const code = "export { "+waw.Name+"Service } from './"+waw.name+".service';";
		let index_exports = fs.readFileSync(index, 'utf8') || '';
		if(index_exports.indexOf(code)===-1){
			index_exports += (index_exports.length&&"\n"||"")+code;
			fs.writeFileSync(index, index_exports, 'utf8');
		}
	}
	console.log('Service has been created');
	process.exit(1);
}
