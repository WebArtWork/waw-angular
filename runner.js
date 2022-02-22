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
		default: __dirname + '/page/default'
	},
	pipe: {
		default: __dirname + '/pipe/default'
	},
	popup: {
		default: __dirname + '/popup/default'
	},
	service: {
		default: __dirname + '/service/default'
	},
	module: {
		default: __dirname + '/module/default'
	}
}
/*
*	Alert
*/
const new_alert = (waw) => {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'alerts', 'Alert already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'alert', () => { new_alert(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.alert = new_alert;
/*
*	Component
*/
const new_component = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'core/components', 'Component already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'component', () => { new_component(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.component = new_component;
module.exports.c = new_component;
/*
*	Loader
*/
const new_loader = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'loaders', 'Loader already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'loader', () => { new_loader(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.loader = new_loader;
module.exports.l = new_loader;
/*
*	Popup
*/
const new_popup = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'popups', 'Popup already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'popup', () => { new_popup(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.popup = new_popup;
/*
*	Modal
*/
const new_modal = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'modals', 'Modal already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'modal', () => { new_modal(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.modal = new_modal;
module.exports.m = new_modal;
/*
*	Page
*/
const new_page = function (waw) {
	// waw page user profile REPO
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'pages', 'Page already exists')) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'page', () => { new_page(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.page = new_page;
module.exports.p = new_page;
/*
*	Pipe
*/
const new_pipe = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'core/pipes', 'Pipe already exists', false)) return;
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'pipe', () => { new_pipe(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.pipe = new_pipe;
/*
*	Service
*/
const new_service = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'services', 'Service already exists', false)) return;
	}
	if (!fs.existsSync(process.cwd() + '/src/app/services/index.ts')) {
		fs.writeFileSync(process.cwd() + '/src/app/services/index.ts', '');
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'service', () => { new_service(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.service = new_service;
module.exports.s = new_service;
/*
*	Customization
*/
const generate = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'services', 'Service already exists')) return;
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
/*
*	Module
*/
const new_module = function (waw) {
	if (!waw.path) {
		if(waw.ensure(process.cwd() + '/src/app/', 'modules', 'Module already exists')) return;
	}
	if (!fs.existsSync(process.cwd() + '/src/app/modules/index.ts')) {
		fs.writeFileSync(process.cwd() + '/src/app/modules/index.ts', '');
	}
	if (!waw.template) {
		return waw.read_customization(defaults, 'module', () => { new_module(waw) });
	}
	require(waw.template + '/cli.js')(waw);
}
module.exports.add = new_module;
module.exports.a = new_module;
const _fetch_module = (waw, location, callback) => {
	if (!fs.existsSync(location + '/module.json')) {
		return callback(false);
	}
	let json = waw.readJson(location + '/module.json');
	if(!json.repo) {
		return callback(false);
	}
	waw.fetch(path.normalize(location), json.repo, err=>{
		if (err) {
			// console.log(err);
			// console.log(json);
			// console.log(json.repo);
			// console.log(location + '/module.json');
		}
		callback(!err);
	});
}
const fetch_module = function (waw) {
	if (waw.argv.length>1) {
		_fetch_module(waw, process.cwd() + '/src/app/modules/' + waw.argv[1].toLowerCase(), done=>{
			if (done) console.log(waw.argv[1] + ' were fetched from the repo');
			else console.log(waw.argv[1] + " don't have repo");
		});
	} else {
		let folders = waw.getDirectories(process.cwd() + '/src/app/modules');
		let counter = folders.length;
		for (let i = 0; i < folders.length; i++) {
			_fetch_module(waw, folders[i], ()=>{
				if(--counter===0) {
					console.log('All possible modules were fetched from their repositories');
					process.exit(1);
				}
			});
		}
	}
}
module.exports.fetch = fetch_module;
module.exports.f = fetch_module;
/*
*	Upload
*/
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
*	waw.ngx_config.name
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
/*
*	End Of
*/
