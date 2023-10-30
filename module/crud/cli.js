const exe = require('child_process').execSync;
const fetch = require("node-fetch");
const path = require('path');
const fs = require('fs');

const finish = (waw)=>{
	if (!waw.pageName) {
		waw.readline.question('Provide page name: ', pageName => {
			if (pageName) {
				waw.pageName = pageName.toLowerCase();
			}

			finish(waw)
		});

		return;
	}

	fs.mkdirSync(path.join(waw.base, 'pages', waw.pageName), {
		recursive: true
	});

	const serviceName = 's' + waw.name.charAt(0).toLowerCase();

	let html = fs.readFileSync(waw.template + '/component.html', 'utf8');
	html = html.split('SERVICENAME').join(serviceName);
	html = html.split('CSERVICE').join(waw.Name);
	html = html.split('SERVICE').join(waw.name);
	html = html.split('CNAME').join(waw.pageName);
	html = html.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.html', html, 'utf8');

	let scss = fs.readFileSync(waw.template + '/component.scss', 'utf8');
	scss = scss.split('SERVICENAME').join(serviceName);
	scss = scss.split('CSERVICE').join(waw.Name);
	scss = scss.split('SERVICE').join(waw.name);
	scss = scss.split('CNAME').join(waw.pageName);
	scss = scss.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.scss', scss, 'utf8');

	let ts = fs.readFileSync(waw.template + '/component.ts', 'utf8');
	ts = ts.split('FILENAME').join(waw.fileName);
	ts = ts.split('SERVICENAME').join(serviceName);
	ts = ts.split('CSERVICE').join(waw.Name);
	ts = ts.split('SERVICE').join(waw.name);
	ts = ts.split('CNAME').join(waw.pageName);
	ts = ts.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.component.ts', ts, 'utf8');

	let mod = fs.readFileSync(waw.template + '/module.ts', 'utf8');
	mod = mod.split('FILENAME').join(waw.fileName);
	mod = mod.split('SERVICENAME').join(serviceName);
	mod = mod.split('CSERVICE').join(waw.Name);
	mod = mod.split('SERVICE').join(waw.name);
	mod = mod.split('CNAME').join(waw.pageName);
	mod = mod.split('NAME').join(waw.name);
	fs.writeFileSync(waw.base + '.module.ts', mod, 'utf8');

	console.log('Module has been created');

	process.exit(1);
}

module.exports = async waw => {
	const response = await fetch(
		"https://webart.work/api/registry/ngx/module/" + waw.name
	);
	if (response.ok) {
		fs.mkdirSync(waw.base, {
			recursive: true
		});

		const resp = await response.json();

		if (resp.repo) {
			waw.fetch(waw.base, resp.repo, (err) => {}, resp.branch || 'master');
		} else {
			for (const file in resp.files) {
				fs.writeFileSync(
					path.join(waw.base, file),
					resp.files[file],
					'utf8'
				);
			}
		}

		console.log('Module has been created');

		process.exit(1);
	} else {
		fs.mkdirSync(path.join(waw.base, 'services'), {
			recursive: true
		});

		let ts = fs.readFileSync(waw.template + '/service.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.pageName);
		ts = ts.split('NAME').join(waw.name);
		fs.writeFileSync(waw.base + '.service.ts', ts, 'utf8');

		finish(waw);
	}
}
