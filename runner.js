const { exec } = require('child_process');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
const path = require('path');
const https = require('https');
const fs = require('fs');
const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source => {
	if (!fs.existsSync(source)) {
		return [];
	}
	return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
}
const waw = {
	fs: fs,
	exe: function(command, cb=()=>{}){
		if(!command) return cb();
		exec(command, (err, stdout, stderr) => {
			cb({err, stdout, stderr});
		});
	},
	make_path: function(argv, folder, double_name){
		if(!argv.length){
			console.log('Provide Name');
			process.exit(0);
		}
		let path_argv = argv.slice();
		waw.path = path_argv[0];
		if(path_argv[0].indexOf('/')==-1){
			waw.path = folder;
			while(path_argv.length){
				waw.path += '/' + path_argv.shift();
			}
		}
		waw.path = waw.path.toLowerCase();
		let name_argv = argv.slice();
		waw.name = name_argv[name_argv.length-1];
		if(waw.name.indexOf('/')>-1){
			waw.name = waw.name.split('/');
			waw.name = waw.name[waw.name.length-1];
		}
		waw.name = waw.name.toLowerCase();
		waw.Name = waw.name.slice(0, 1).toUpperCase() + waw.name.slice(1);
		waw.base = process.cwd() + '/src/app/'+waw.path;
		if(double_name){
			waw.base += '/'+waw.name;
		}
	},
	add_code: function(opts){
		if(!fs.existsSync(opts.file)) return;
		let code = fs.readFileSync(opts.file, 'utf8');
		if(code && code.indexOf(opts.search)>-1){
			code = code.replace(opts.search, opts.replace);
			fs.writeFileSync(opts.file, code, 'utf8');
		}
	},
	read_customization: function(params, element, next){
		let elements = getDirectories(process.cwd()+'/template/'+element);
		for (var i = 0; i < elements.length; i++) {
			this.defaults[element][path.basename(elements[i])] = elements[i];
		}
		if(Object.keys(this.defaults[element]).length>1){
			params.template = this.defaults[element];
			let text = 'Which element you want to use?', counter=0, repos={};
			for(let key in this.defaults[element]){
				repos[++counter] = this.defaults[element][key];
				text += '\n'+counter+') '+key;
			}
			text += '\nChoose number: ';
			return readline.question(text, (answer)=>{
				if(!answer||!repos[parseInt(answer)]){
					return this.read_customization(params, element, next);
				}
				params.template = repos[parseInt(answer)];
				next();
			});
		}else{
			params.template = this.defaults[element].default;
			next();
		}
	},
	defaults: {
		alert: {
			default: __dirname+'/alert'
		},
		component: {
			default: __dirname+'/component'
		},
		loader: {
			default: __dirname+'/loader'
		},
		modal: {
			default: __dirname+'/modal'
		},
		page: {
			default: __dirname+'/page/default'
		},
		pipe: {
			default: __dirname+'/pipe'
		},
		popup: {
			default: __dirname+'/popup'
		},
		service: {
			default: __dirname+'/service'
		},
		module: {
			default: __dirname+'/module/default'
		}
	}
};
const new_alert = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'alerts', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Alert already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'alert', ()=>{ new_alert(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.alert = new_alert;
module.exports.a = new_alert;

const new_component = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'core', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Component already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'component', ()=>{ new_component(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.component = new_component;
module.exports.c = new_component;

const new_loader = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'loaders', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Loader already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'loader', ()=>{ new_loader(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.loader = new_loader;
module.exports.l = new_loader;

const new_modal = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'modals', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Modal already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'modal', ()=>{ new_modal(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.modal = new_modal;
module.exports.m = new_modal;

const new_page = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'pages', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Page already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'page', ()=>{ new_page(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.page = new_page;
module.exports.p = new_page;

const new_pipe = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'core/pipes');
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Pipe already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'pipe', ()=>{ new_pipe(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.pipe = new_pipe;

const new_popup = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'popups', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Popup already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'popup', ()=>{ new_popup(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.popup = new_popup;

const new_service = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'services');
	if (fs.existsSync(waw.base+'.service.ts')) {
		console.log('Service already exists');
		process.exit(0);
	}
	if(!params.template){
		return waw.read_customization(params, 'service', ()=>{ new_service(params) });
	}
	require(params.template+'/cli.js')(waw);
}
module.exports.service = new_service;
module.exports.s = new_service;

const generate = function(params){
	if(!params.element){
		if(params.argv.length && waw.defaults[params.argv[0].toLowerCase()]){
			params.element = params.argv[0].toLowerCase();
		}else{
			let text = 'Which element you want to customize?', counter=0, repos={};
			for(let key in waw.defaults){
				repos[++counter] = key;
				text += '\n'+counter+') '+key;
			}
			text += '\nChoose number: ';
			return readline.question(text, function(answer){
				if(!answer||!repos[parseInt(answer)]) return new_project();
				params.element = repos[parseInt(answer)];
				generate(params);
			});
		}
	}
	if(!waw.defaults[params.element]){
		delete params.element;
		return generate(params);
	}
	if(!params.name){
		if(params.argv.length>1){
			params.name = params.argv[1].toLowerCase();
		}else{
			return readline.question('Provide name for customization: ', function(answer){
				params.name = answer.toLowerCase();
				generate(params);
			});
		}
	}
	let path = process.cwd()+'/template/'+params.element+'/'+params.name;
	fs.mkdirSync(process.cwd()+'/template/'+params.element, { recursive: true });
	if (fs.existsSync(path)) {
		console.log('Customization already exists');
		process.exit(0);
	}
	waw.exe('cp -rf '+__dirname+'/'+params.element+' '+path, ()=>{
		console.log('Customization '+params.element+' '+params.name+' created');
		process.exit(1);
	});
}
module.exports.generate = generate;
module.exports.g = generate;

const new_module = function (params) {
	waw.params = params;
	waw.make_path(params.argv, 'modules');
	if (fs.existsSync(process.cwd() + '/src/app/' + waw.path)) {
		console.log('Module already exists');
		process.exit(0);
	}
	if (!fs.existsSync(process.cwd() + '/src/app/modules')) {
		fs.mkdirSync(process.cwd() + '/src/app/modules');
	}
	if (!fs.existsSync(process.cwd() + '/src/app/modules/index.ts')) {
		fs.writeFileSync(process.cwd() + '/src/app/modules/index.ts', '');
	}
	if (!params.template) {
		return waw.read_customization(params, 'module', () => { new_module(params) });
	}
	require(params.template + '/cli.js')(waw);
}
module.exports.install = new_module;
module.exports.i = new_module;

const add_token = waw => {
	if (fs.existsSync(waw.waw_root+'/config.json')) {
		let waw_conf = JSON.parse(fs.readFileSync(waw.waw_root+'/config.json'));
		if(waw_conf.token){
			waw.ngx_config.token = waw_conf.token;
			fs.writeFileSync(process.cwd()+'/angular.json', JSON.stringify(waw.ngx_config, null, 2));
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
			fs.writeFileSync(process.cwd()+'/angular.json', JSON.stringify(waw.ngx_config, null, 2));
			if (fs.existsSync(waw.waw_root+'/config.json')) {
				let waw_conf = JSON.parse(fs.readFileSync(waw.waw_root+'/config.json'));
				waw_conf.token = json.token;
				fs.writeFileSync(waw.waw_root+'/config.json', JSON.stringify(waw_conf, null, 2));
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
			if(!json.ready){
				console.log('Something went wrong');
				process.exit(1);
			}
			const files = waw.getFilesRecursively(process.cwd()+'/dist/app');
			let counter = files.length;
			for (var i = files.length - 1; i >= 0; i--) {
				files[i]
				this.upload_file(waw, files[i], ()=>{
					if(--counter === 0){
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
	if (!fs.existsSync(process.cwd()+'/angular.json')) {
		console.log('This is not angular project');
		process.exit(1);
	}
	waw.ngx_config = JSON.parse(fs.readFileSync(process.cwd()+'/angular.json'));
	if(!waw.ngx_config.name){
		waw.ngx_config.name = path.basename(process.cwd());
		fs.writeFileSync(process.cwd()+'/angular.json', JSON.stringify(waw.ngx_config, null, 2));
	}
	if(!waw.ngx_config.token) add_token(waw);
	else upload_files(waw);
}
module.exports.upload = upload;
module.exports.u = upload;
