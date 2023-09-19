const exe = require('child_process').execSync;

const path = require('path');

const fs = require('fs');

const defaults = {
	alert: {
		default: path.join(__dirname, 'alert', 'default')
	},
	component: {
		default: path.join(__dirname, 'component', 'default')
	},
	loader: {
		default: path.join(__dirname, 'loader', 'default')
	},
	modal: {
		default: path.join(__dirname, 'modal', 'default')
	},
	page: {
		default: path.join(__dirname, 'page', 'default'),
		crud: path.join(__dirname, 'page', 'crud')
	},
	pipe: {
		default: path.join(__dirname, 'pipe', 'default')
	},
	popup: {
		default: path.join(__dirname, 'popup', 'default')
	},
	service: {
		default: path.join(__dirname, 'service', 'default'),
		crud: path.join(__dirname, 'service', 'crud')
	},
	module: {
		default: path.join(__dirname, 'module', 'default')
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
	const base = path.join(process.cwd(), 'template');
	const customizations = waw.getDirectories(base);
	for (const customization of customizations) {
		const def = path.basename(customization);
		if (!defaults[def]) {
			defaults[def] = {};
		}
		const customs = waw.getDirectories(customization);
		for (const custom of customs){
			const name = path.basename(custom);
			defaults[def][name] = custom;
		}
	}

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

const install = (waw, location, callback) => {
	const json = waw.readJson(path.join(location, 'module.json'));
	if (json.dependencies) {
		waw.each(json.dependencies, (name, version, next) => {
			waw.npmi({
				path: process.cwd(),
				name,
				version,
				save: true
			}, next);
		}, () => {
			callback();
		});
	} else {
		callback();
	}
}

const fetch = waw => {
	fs.mkdirSync(waw.base, {
		recursive: true
	});

	waw.fetch(waw.base, waw.repo, (err) => {
		if (err) console.log('Repository was not found');
		else console.log('Code is successfully installed');
		install(waw, waw.base, ()=>{
			process.exit(1);
		});
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

const fetch_module = (waw, location, callback) => {
	location = path.normalize(location);
	if (!fs.existsSync(location + '/module.json')) {
		return callback(false);
	}
	let json = waw.readJson(location + '/module.json');
	if (!json.repo) {
		return callback(false);
	}
	waw.fetch(location, json.repo, err => {
		callback();
		// waw.install(waw, location, callback);
	});
};

const fetch_modules = async waw => {
	if (waw.argv.length > 1) {
		fetch_module(
			waw,
			process.cwd() + '/src/app/modules/' + waw.argv[1].toLowerCase(),
			done => {
				if (done) {
					console.log('Module ' + waw.argv[1] + ' were fetched from the repo');
				} else {
					console.log('Module ' + waw.argv[1] + " don't have an repo");
				}
				process.exit(1);
			}
		);
	} else {
		const folders = waw.getDirectories(process.cwd() + '/src/app/modules');
		let counter = folders.length;
		for (let i = 0; i < folders.length; i++) {
			fetch_module(waw, folders[i], () => {
				if (--counter === 0) {
					console.log('All possible modules were fetched from their repositories');
					process.exit(1);
				}
			});
		}
	}
};
module.exports.fetch = fetch_modules;
module.exports.f = fetch_modules;

const generate = async waw => {
	waw.argv.shift();

	if (waw.argv.length && defaults[waw.argv[0].toLowerCase()]) {
		waw.element = waw.argv[0].toLowerCase();
	}

	if (!waw.element) {
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

	if (!defaults[waw.element]) {
		delete waw.element;
		return generate(waw);
	}

	if (waw.argv.length > 1) {
		waw.name = waw.argv[1].toLowerCase();
	}

	if (!waw.name) {
		return waw.readline.question('Provide name for customization: ', function (answer) {
			waw.name = answer.toLowerCase();
			generate(waw);
		});
	}

	const loc = path.join(process.cwd(), 'template', waw.element, waw.name);

	if (fs.existsSync(loc)) {
		console.log('Customization already exists');
		process.exit(0);
	}

	fs.mkdirSync(loc, {
		recursive: true
	});

	exe('cp -rf ' + path.join(__dirname, waw.element) + ' ' + loc);

	console.log('Customization ' + waw.element + ' ' + waw.name + ' created');

	process.exit(1);
}
module.exports.generate = generate;
module.exports.g = generate;

const update_module = async (waw, module, callback) => {
	const branch = waw.argv.length > 2 ? waw.argv[2] : 'master';

	const location = module.location;

	const temp = path.join(location, 'temp');

	waw.fetch(temp, module.config.repo, err => {
		if (fs.existsSync(path.join(location, '.git'))) {
			fs.rmSync(path.join(location, '.git'), { recursive: true});
		}

		if (!path.join(temp, '.git')) {
			if (fs.existsSync(temp)) {
				fs.rmSync(temp, { recursive: true});
			}

			return callback();
		}

		fs.renameSync(
			path.join(temp, '.git'),
			path.join(location, '.git')
		);

		fs.rmSync(temp, { recursive: true });

		if (fs.existsSync(path.join(location, '.git'))) {
			const command = 'cd ./src/app/modules/' + module.name + ' && ';

			exe(command + 'git add --all .');

			try {
				exe(command + 'git commit -m "' + waw.argv[1] + '"');

				exe(command + 'git push origin "' + branch + '"');
			} catch (error) {}

			fs.rmSync(path.join(location, '.git'), { recursive: true });
		}

		callback();
	}, branch, false);
}

module.exports.sync = async waw => {
	const modules = waw.getDirectories(path.join(process.cwd(), 'src', 'app', 'modules'));

	for (let i = modules.length-1; i >= 0; i--) {
		modules[i] = {
			config: waw.readJson(path.join(modules[i], 'module.json')),
			name: path.basename(modules[i]),
			location: modules[i]
		};

		if (!modules[i].config.repo) {
			modules.splice(i, 1);
		}
	}

	let countdown = modules.length;

	if (waw.argv.length === 1) {
		for (const module of modules) {
			fetch_module(waw, module.location, ()=>{
				if(--countdown === 0) {
					console.log('All modules were synchronized');
					process.exit(1);
				}
			});
		}
	} else if (waw.argv.length > 1) {
		for (const module of modules) {
			update_module(waw, module, () => {
				if (--countdown === 0) {
					console.log('All modules were updated and synchronized');
					process.exit(1);
				}
			});
		}
	}
};

// TODO make below work :)

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
			const files = waw.getFilesRecursively(
				path.join(
					process.cwd(),
					waw.ngx_config.name || path.join('dist', 'app')
				)
			);
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

	if (waw.ngx_config.name && waw.ngx_config.token) {
		upload_files(waw);
	} else if (!waw.ngx_config.name) {
		console.log('You have to add name into angular config json');
		process.exit(1);
	} else {
		console.log('You have to add token into angular config json');
		process.exit(1);
	}
}
module.exports.upload = upload;
module.exports.u = upload;
