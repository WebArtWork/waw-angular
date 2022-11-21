const fs = require('fs');
const path = require('path');
const exe = require('child_process').execSync;
const root = exe('npm root -g').toString().trim();
if (!fs.existsSync(root + '/@angular/cli')) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(0);
}

module.exports = async waw => {
	let ts = fs.readFileSync(waw.template + '/pipe.ts', 'utf8');
	ts = ts.split('CNAME').join(waw.Name);
	ts = ts.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.pipe.ts', ts, 'utf8');

	waw.add_code({
		file: process.cwd() + '/src/app/core/core.module.ts',
		search: '/* exports */',
		replace: "/* exports */\n\t\t" + waw.Name + "Pipe,"
	});

	console.log('Pipe has been created');

	process.exit(1);
}
