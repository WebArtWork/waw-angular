const path = require('path');
const fs = require('fs');
const defaults = {
	alert: {
		default: __dirname + '/alert/default'
	},
	component: {
		default: __dirname + '/component/default'
	},
	loader: {
		default: __dirname + '/loader/default'
	},
	modal: {
		default: __dirname + '/modal/default'
	},
	page: {
		default: __dirname + '/page/default',
		crud: __dirname + '/page/crud'
	},
	pipe: {
		default: __dirname + '/pipe/default'
	},
	popup: {
		default: __dirname + '/popup/default'
	},
	service: {
		default: __dirname + '/service/default',
		crud: __dirname + '/service/crud'
	},
	module: {
		default: __dirname + '/module/default'
	}
}

const initialize = waw => {
	waw.argv.shift();

	if (!waw.argv.length) {
		console.log('Please provide name');

		process.exit(1);
	}

	waw.name = waw.argv[waw.argv.length - 1];


	if (waw.name.startsWith('ngx-')) {
		waw.name  = waw.argv[waw.argv.length-1].replace('ngx-', '');

		waw.argv[waw.argv.length - 1] = waw.name;

		waw.repo = 'https://github.com/WebArtWork/ngx-' + waw.name + '.git';
	} else {
		waw.Name = waw.name[0].toUpperCase() + waw.name.slice(1, waw.name.length);
	}

	waw.base = path.join(process.cwd(), 'src', 'app', waw.folder);

	for (let i = 0; i < waw.argv.length - 1; i++) {
		waw.argv[i] = waw.argv[i].toLowerCase();
	}

	waw.base = path.join(waw.base, waw.argv.join(path.sep));

	waw.component = [waw.folder, waw.argv.join('/')].join('/');

	waw.fileName = waw.name;

	for (let i = 0; i < waw.fileName.length; i++) {
		if (waw.fileName[i].match(/^[A-Z]*$/)) {
			waw.fileName = waw.fileName.slice(0, i) + '-' + waw.fileName.slice(i);

			i++;
		}
	}

	waw.fileName = waw.fileName.toLowerCase();

	const _argv = waw.argv.slice();

	_argv.pop();

	waw.fileComponent = [waw.folder, _argv.join('/'), waw.fileName].join('/');

	const base = waw.base.split(path.sep);

	base.pop();

	waw.base = path.join(base.join(path.sep), waw.fileName);
};

const template = (waw, next) => {
	if (Object.keys(defaults[waw.module]).length > 1) {
		let text = 'Which module you want to use?', counter = 0, repos = {};
		for (let key in defaults[waw.module]) {
			repos[++counter] = defaults[waw.module][key];
			text += '\n' + counter + ') ' + key;
		}
		text += '\nChoose number: ';
		waw.readline.question(text, (answer) => {
			if (!answer || !repos[parseInt(answer)]) {
				template(waw, next);
			} else {
				waw.template = repos[parseInt(answer)];
				next();
			}
		});
	} else {
		waw.template = defaults[waw.module].default;
		next();
	}
};

const fetch = waw => {
	fs.mkdirSync(waw.base, {
		recursive: true
	});

	waw.fetch(waw.base, waw.repo, (err) => {
		if (err) console.log('Repository was not found');
		else console.log('Code is successfully installed');
		process.exit(1);
	});
};

const run = (module, folder) => {
	return waw => {
		waw.module = module;
		waw.folder = folder;
		initialize(waw);
		if (waw.repo) {
			fetch(waw);
		} else {
			template(waw, () => {
				require(path.join(waw.template, 'cli.js'))(waw);
			});
		}
	}
};

module.exports.alert = run('alert', 'alerts');

module.exports.component = run('component', 'core/components');
module.exports.c = run('component', 'core/components');

module.exports.page = run('page', 'pages');
module.exports.p = run('page', 'pages');

module.exports.loader = run('loader', 'loaders');
module.exports.l = run('loader', 'loaders');

module.exports.modal = run('modal', 'modals');
module.exports.m = run('modal', 'modals');

module.exports.popup = run('popup', 'popups');

module.exports.pipe = run('pipe', 'core/pipes');

module.exports.service = run('service', 'core/services');
module.exports.s = run('service', 'core/services');

module.exports.module = run('module', 'modules');
module.exports.add = run('module', 'modules');
module.exports.a = run('module', 'modules');

const _fetch_module = (waw, location, callback) => {
	if (!fs.existsSync(location + '/module.json')) {
		return callback(false);
	}
	let json = waw.readJson(location + '/module.json');
	if (!json.repo) {
		return callback(false);
	}
	waw.fetch(path.normalize(location), json.repo, err => {
		json = waw.readJson(location + '/module.json');
		if (json.dependencies) {
			waw.each(json.dependencies, (name, version, next) => {
				waw.npmi({
					path: process.cwd(),
					name,
					version,
					save: true
				}, next);
			}, () => {
				callback(!err);
			});
		} else {
			callback(!err);
		}
	});
}
const fetch_module = async waw => {
	if (waw.argv.length > 1) {
		_fetch_module(waw, process.cwd() + '/src/app/modules/' + waw.argv[1].toLowerCase(), done => {
			if (done) console.log(waw.argv[1] + ' were fetched from the repo');
			else console.log(waw.argv[1] + " don't have repo");
		});
	} else {
		let folders = waw.getDirectories(process.cwd() + '/src/app/modules');
		let counter = folders.length;
		for (let i = 0; i < folders.length; i++) {
			_fetch_module(waw, folders[i], () => {
				if (--counter === 0) {
					console.log('All possible modules were fetched from their repositories');
					process.exit(1);
				}
			});
		}
	}
}
module.exports.fetch = fetch_module;
module.exports.f = fetch_module;

const generate = async waw => {
	if (!waw.path) {
		if (waw.ensure(process.cwd() + '/src/app/', 'services', 'Service already exists')) return;
	}
	if (!waw.element) {
		if (waw.argv.length && defaults[waw.argv[0].toLowerCase()]) {
			waw.element = waw.argv[0].toLowerCase();
		} else {
			let text = 'Which element you want to customize?', counter = 0, repos = {};
			for (let key in defaults) {
				repos[++counter] = key;
				text += '\n' + counter + ') ' + key;
			}
			text += '\nChoose number: ';
			return waw.readline.question(text, function (answer) {
				if (!answer || !repos[parseInt(answer)]) return new_project();
				waw.element = repos[parseInt(answer)];
				generate(waw);
			});
		}
	}
	if (!defaults[waw.element]) {
		delete waw.element;
		return generate(waw);
	}
	if (!waw.name) {
		if (waw.argv.length > 1) {
			waw.name = waw.argv[1].toLowerCase();
		} else {
			return waw.readline.question('Provide name for customization: ', function (answer) {
				waw.name = answer.toLowerCase();
				generate(waw);
			});
		}
	}
	let path = process.cwd() + '/template/' + waw.element + '/' + waw.name;
	fs.mkdirSync(process.cwd() + '/template/' + waw.element, { recursive: true });
	if (fs.existsSync(path)) {
		console.log('Customization already exists');
		process.exit(0);
	}
	waw.exe('cp -rf ' + __dirname + '/' + waw.element + ' ' + path, () => {
		console.log('Customization ' + waw.element + ' ' + waw.name + ' created');
		process.exit(1);
	});
}
module.exports.generate = generate;
module.exports.g = generate;

const add_token = waw => {
	if (fs.existsSync(waw.waw_root + '/config.json')) {
		let waw_conf = JSON.parse(fs.readFileSync(waw.waw_root + '/config.json'));
		if (waw_conf.token) {
			waw.ngx_config.token = waw_conf.token;
			fs.writeFileSync(process.cwd() + '/angular.json', JSON.stringify(waw.ngx_config, null, 2));
			return upload_files(waw);
		}
	}
	const req = https.request({
		hostname: 'webart.work',
		port: 443,
		path: '/api/user/token',
		method: 'GET'
	}, resp => {
		resp.on('data', data => {
			const json = JSON.parse(data.toString());
			waw.ngx_config.token = json.token;
			fs.writeFileSync(process.cwd() + '/angular.json', JSON.stringify(waw.ngx_config, null, 2));
			if (fs.existsSync(waw.waw_root + '/config.json')) {
				let waw_conf = JSON.parse(fs.readFileSync(waw.waw_root + '/config.json'));
				waw_conf.token = json.token;
				fs.writeFileSync(waw.waw_root + '/config.json', JSON.stringify(waw_conf, null, 2));
			}
		})
	});
	req.on('error', error => {
		console.error(error)
	});
	req.end();
}
const upload_file = (waw, file, done) => {
	/*
		waw.ngx_config.name
		waw.ngx_config.token
		file
	*/
}
const upload_files = waw => {
	const req = https.request({
		hostname: 'webart.work',
		port: 443,
		path: '/api/user/prepare',
		method: 'GET'
	}, resp => {
		resp.on('data', data => {
			const json = JSON.parse(data.toString());
			if (!json.ready) {
				console.log('Something went wrong');
				process.exit(1);
			}
			const files = waw.getFilesRecursively(process.cwd() + '/dist/app');
			let counter = files.length;
			for (var i = files.length - 1; i >= 0; i--) {
				files[i]
				this.upload_file(waw, files[i], () => {
					if (--counter === 0) {
						console.log('Uploaded properly');
						process.exit(1);
					}
				});
			}
		});
	});
	req.on('error', error => {
		console.error(error)
	});
	req.end();
}
const upload = waw => {
	if (!fs.existsSync(process.cwd() + '/angular.json')) {
		console.log('This is not angular project');
		process.exit(1);
	}
	waw.ngx_config = JSON.parse(fs.readFileSync(process.cwd() + '/angular.json'));
	if (!waw.ngx_config.name) {
		waw.ngx_config.name = path.basename(process.cwd());
		fs.writeFileSync(process.cwd() + '/angular.json', JSON.stringify(waw.ngx_config, null, 2));
	}
	if (!waw.ngx_config.token) add_token(waw);
	else upload_files(waw);
}
module.exports.upload = upload;
module.exports.u = upload;
