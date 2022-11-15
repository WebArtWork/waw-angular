const fs = require('fs');
const path = require('path');
const exe = require('child_process').execSync;
const root = exe('npm root -g').toString().trim();
if (!fs.existsSync(root + '/@angular/cli')) {
	console.log("You should install '@angular/cli' global. 'npm i -g @angular/cli'");
	process.exit(1);
}

module.exports = async waw => {
	exe('ng g c ' + waw.component);

	fs.mkdirSync(waw.base, {
		recursive: true
	});

	waw.base = path.join(waw.base, waw.name);

	let html = fs.readFileSync(waw.template+'/component.html', 'utf8');
	html = html.split('CNAME').join(waw.Name);
	html = html.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.html', html, 'utf8');

	let scss = fs.readFileSync(waw.template+'/component.scss', 'utf8');
	scss = scss.split('CNAME').join(waw.Name);
	scss = scss.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.scss', scss, 'utf8');

	let ts = fs.readFileSync(waw.template+'/component.ts', 'utf8');
	ts = ts.split('CNAME').join(waw.Name);
	ts = ts.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.ts', ts, 'utf8');

	waw.add_code({
		file: process.cwd() + '/src/app/app.module.ts',
		search: '/* alerts */',
		replace: "/* alerts */\n\t\t\t\t\t" + waw.name + ": " + waw.Name + "Component,"
	});

	console.log('Alert has been created');

	process.exit(1);
}
