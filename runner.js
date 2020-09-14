const { exec } = require('child_process');
const fs = require('fs');
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
	}
};
const new_alert = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'alerts', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Alert already exists');
		process.exit(0);
	}
	require(__dirname+'/alert/cli.js')(waw);
}
module.exports.alert = new_alert;
module.exports.a = new_alert;

const new_component = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'common', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Component already exists');
		process.exit(0);
	}
	require(__dirname+'/component/cli.js')(waw);
}
module.exports.component = new_component;
module.exports.c = new_component;

const new_filter = function(params){
	waw.params = params;
	if (!fs.existsSync(process.cwd() + '/src/app/filters')) {
		fs.mkdirSync(process.cwd() + '/src/app/filters');
		fs.writeFileSync(process.cwd() + '/src/app/filters/index.ts', '', 'utf8');
	}
	waw.make_path(params.argv, 'filters');
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Filter already exists');
		process.exit(0);
	}
	require(__dirname+'/filter/cli.js')(waw);
}
module.exports.filter = new_filter;
module.exports.f = new_filter;

const new_loader = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'loaders', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Loader already exists');
		process.exit(0);
	}
	require(__dirname+'/loader/cli.js')(waw);
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
	require(__dirname+'/modal/cli.js')(waw);
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
	require(__dirname+'/page/cli.js')(waw);
}
module.exports.page = new_page;
module.exports.p = new_page;

const new_popup = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'popups', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+waw.path)) {
		console.log('Popup already exists');
		process.exit(0);
	}
	require(__dirname+'/popup/cli.js')(waw);
}
module.exports.popup = new_popup;

const new_service = function(params){
	waw.params = params;
	waw.make_path(params.argv, 'services');	
	if (fs.existsSync(waw.base+'.service.ts')) {
		console.log('Service already exists');
		process.exit(0);
	}
	require(__dirname+'/service/cli.js')(waw);	
}
module.exports.service = new_service;
module.exports.s = new_service;

const new_custom = function(params){



	
	/* clone folder to project */
	/* allow default to be re-written */
	/* allow modify replace code */
}
module.exports.new = new_custom;