const fs = require('fs');
module.exports = function (waw) {
	let base = process.cwd() + '/src/app/modules/' + waw.params.argv[0];
	let name = waw.params.argv[0];
	let cname = name.slice(0, 1).toUpperCase() + name.slice(1);
	const add_index = ()=>{
		let index = process.cwd() + '/src/app/modules/index.ts';
		let index_exports = waw.fs.readFileSync(index, 'utf8') || '';
		let code = "export { " + cname + "Module } from './" + name + "/" + name + ".module';";
		if (index_exports.indexOf(code) == -1) {
			index_exports += (index_exports.length && "\n" || "") + code;
			waw.fs.writeFileSync(index, index_exports, 'utf8');
		}
	}
	const create = ()=>{
		if (fs.existsSync(base + '/' + name + '.component.css')) {
			fs.unlink(base + '/' + name + '.component.css', (err) => {})
		}
		if (fs.existsSync(base + '/' + name + '.component.spec.ts')) {
			fs.unlink(base + '/' + name + '.component.spec.ts', (err) => {})
		}
		let html = waw.fs.readFileSync(waw.params.template + '/component.html', 'utf8');
		html = html.split('CNAME').join(cname);
		html = html.split('NAME').join(name);
		waw.fs.writeFileSync(base + '/' + name + '.component.html', html, 'utf8');
		let scss = waw.fs.readFileSync(waw.params.template + '/component.scss', 'utf8');
		scss = scss.split('CNAME').join(cname);
		scss = scss.split('NAME').join(name);
		waw.fs.writeFileSync(base + '/' + name + '.component.scss', scss, 'utf8');
		let ts = waw.fs.readFileSync(waw.params.template + '/component.ts', 'utf8');
		ts = ts.split('CNAME').join(cname);
		ts = ts.split('NAME').join(name);
		waw.fs.writeFileSync(base + '/' + name + '.component.ts', ts, 'utf8');
		let mod = waw.fs.readFileSync(waw.params.template + '/module.ts', 'utf8');
		mod = mod.split('CNAME').join(cname);
		mod = mod.split('NAME').join(name);
		waw.fs.writeFileSync(base + '/' + name + '.module.ts', mod, 'utf8');
		console.log('Module has been created');
		add_index();
		process.exit(1);
	}
	if (!fs.existsSync(base)) {
		fs.mkdirSync(base, { recursive: true });
	}
	if (waw.params.argv.length > 1) {
		let repo = waw.params.git(base);
		repo.init(function () {
			repo.addRemote('origin', waw.params.argv[1], function (err) {
				if (err) return create();
				repo.fetch('--all', function (err) {
					if (err) return create();
					let branch = 'master';
					if (waw.params.argv.length > 2) {
						branch = waw.params.argv[2];
					}
					repo.reset('origin/' + branch, err => {
						if (err) return create();
						console.log('Module has been created');
						add_index();
						process.exit(1);
					});
				});
			});
		});
	}else {
		create();
	}
}
