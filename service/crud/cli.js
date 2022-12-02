const fs = require('fs');

module.exports = async waw => {
	let ts = fs.readFileSync(waw.template + '/service.ts', 'utf8');
	ts = ts.split('CNAME').join(waw.Name);
	ts = ts.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.service.ts', ts, 'utf8');

	console.log('Service has been created');

	process.exit(1);
}
