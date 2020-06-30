const { exec } = require('child_process');
const fs = require('fs');
const exe = function(command, cb=()=>{}){
	if(!command) return cb();
	exec(command, (err, stdout, stderr) => {
		cb({err, stdout, stderr});
	});
}
const make_path = function(argv, folder, double_name){
	if(!argv.length){
		console.log('Provide Name');
		process.exit(0);
	}
	let path_argv = argv.slice();
	let path = path_argv[0];
	if(path_argv[0].indexOf('/')==-1){
		path = folder;
		while(path_argv.length){
			path += '/' + path_argv.shift();
		}
	}
	path = path.toLowerCase();
	let name_argv = argv.slice();
	let name = name_argv[name_argv.length-1];
	if(name.indexOf('/')>-1){
		name = name.split('/');
		name = name[name.length-1];
	}
	name = name.toLowerCase();
	let Name = name.slice(0, 1).toUpperCase() + name.slice(1);
	let base = process.cwd() + '/src/app/'+path;
	if(double_name){
		base += '/'+name;
	}
	return {path, name, Name, base};
}
const new_page = function(params){
	const {path, name, Name, base} = make_path(params.argv, 'pages', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+path)) {
		console.log('Page already exists');
		process.exit(0);
	}
	exe('ng g m '+path, function(){
		let html = fs.readFileSync(__dirname+'/page/component.html', 'utf8');
		html = html.split('CNAME').join(Name);
		html = html.split('NAME').join(name);
		fs.writeFileSync(base+'.component.html', html, 'utf8');
		let scss = fs.readFileSync(__dirname+'/page/component.scss', 'utf8');
		scss = scss.split('CNAME').join(Name);
		scss = scss.split('NAME').join(name);
		fs.writeFileSync(base+'.component.scss', scss, 'utf8');
		let ts = fs.readFileSync(__dirname+'/page/component.ts', 'utf8');
		ts = ts.split('CNAME').join(Name);
		ts = ts.split('NAME').join(name);
		fs.writeFileSync(base+'.component.ts', ts, 'utf8');
		let mod = fs.readFileSync(__dirname+'/page/module.ts', 'utf8');
		mod = mod.split('CNAME').join(Name);
		mod = mod.split('NAME').join(name);
		fs.writeFileSync(base+'.module.ts', mod, 'utf8');
		let config = fs.readFileSync(process.cwd() + '/src/app/app.module.ts', 'utf8');
		let search = '/* '+params.argv[0]+' */';
		if(config && config.indexOf(search)>-1){
			config = config.replace(search, search+"{\n\t\tpath: '"+name+"',\n\t\tcanActivate: [MetaGuard],\n\t\tdata: {\n\t\t\tmeta: {\n\t\t\t\ttitle: '"+Name+"'\n\t\t\t}\n\t\t},\n\t\tloadChildren: () => import('./"+path+'/'+name+".module').then(m => m."+Name+"Module)\n\t}, ");
			fs.writeFileSync(process.cwd() + '/src/app/app.module.ts', config, 'utf8');
		}
		console.log('Page has been created');
		process.exit(1);
	});
}
module.exports.page = new_page;
module.exports.p = new_page;

const new_service = function(params){
	const {name, Name, base, folder} = make_path(params.argv, 'services');
	if (fs.existsSync(base+'.service.ts')) {
		console.log('Service already exists');
		process.exit(0);
	}
	let ts = fs.readFileSync(__dirname+'/service/service.ts', 'utf8');
	ts = ts.split('CNAME').join(Name);
	ts = ts.split('NAME').join(name);
	fs.writeFileSync(base+'.service.ts', ts, 'utf8');
	let index = process.cwd() + '/src/app/services/index.ts';
	if (fs.existsSync(index)) {
		let index_exports = fs.readFileSync(index, 'utf8') || '';
		let code = "export { "+Name+"Service } from './"+name+".service';";
		if(index_exports.indexOf(code)==-1){
			index_exports += (index_exports.length&&"\n"||"")+code;
			fs.writeFileSync(index, index_exports, 'utf8');
		}
	}
	console.log('Service has been created');
	process.exit(1);
}
module.exports.service = new_service;
module.exports.s = new_service;

const new_filter = function(params){
	if (!fs.existsSync(process.cwd() + '/src/app/filters')) {
		fs.mkdirSync(process.cwd() + '/src/app/filters');
		fs.writeFileSync(process.cwd() + '/src/app/filters/index.ts', '', 'utf8');
	}
	const {path, name, Name, base} = make_path(params.argv, 'filters');
	if (fs.existsSync(process.cwd() + '/src/app/'+path)) {
		console.log('Filter already exists');
		process.exit(0);
	}
	exe('ng g p '+path+' --module=common/common.module', function(){
		fs.unlinkSync(base+'.pipe.spec.ts');
		let ts = fs.readFileSync(__dirname+'/filter/filter.ts', 'utf8');
		ts = ts.split('CNAME').join(Name);
		ts = ts.split('NAME').join(name);
		fs.writeFileSync(base+'.pipe.ts', ts, 'utf8');
		let index = process.cwd() + '/src/app/filters/index.ts';
		if (fs.existsSync(index)) {
			let index_exports = fs.readFileSync(index, 'utf8') || '';
			let code = "export { "+Name+"Pipe } from './"+name+".pipe';";
			if(index_exports.indexOf(code)==-1){
				index_exports += (index_exports.length&&"\n"||"")+code;
				fs.writeFileSync(index, index_exports, 'utf8');
			}
		}
		let config = fs.readFileSync(process.cwd() + '/src/app/common/common.module.ts', 'utf8');
		let search = '/* filters */';
		if(config && config.indexOf(search)>-1){
			config = config.replace(search, search+'\n\t\t'+Name+'Pipe,');
			fs.writeFileSync(process.cwd() + '/src/app/common/common.module.ts', config, 'utf8');
		}
		console.log('Filter has been created');
		process.exit(1);
	});
}
module.exports.filter = new_filter;
module.exports.f = new_filter;

const new_component = function(params){
	const {path, name, Name, base} = make_path(params.argv, 'common', true);
	if (fs.existsSync(process.cwd() + '/src/app/'+path)) {
		console.log('Component already exists');
		process.exit(0);
	}
	exe('ng g c '+path, function(){
		fs.unlinkSync(base+'.component.spec.ts');
		let html = fs.readFileSync(__dirname+'/component/component.html', 'utf8');
		html = html.split('CNAME').join(Name);
		html = html.split('NAME').join(name);
		fs.writeFileSync(base+'.component.html', html, 'utf8');
		let scss = fs.readFileSync(__dirname+'/component/component.scss', 'utf8');
		scss = scss.split('CNAME').join(Name);
		scss = scss.split('NAME').join(name);
		fs.writeFileSync(base+'.component.scss', scss, 'utf8');
		let ts = fs.readFileSync(__dirname+'/component/component.ts', 'utf8');
		ts = ts.split('CNAME').join(Name);
		ts = ts.split('NAME').join(name);
		fs.writeFileSync(base+'.component.ts', ts, 'utf8');
		console.log('Component has been created');
		process.exit(1);
	});
}
module.exports.component = new_component;
module.exports.c = new_component;




const new_alert = function(params){
	console.log('NEW ALERT');
}
module.exports.alert = new_alert;
module.exports.a = new_alert;

const new_modal = function(params){

}
module.exports.modal = new_modal;
module.exports.m = new_modal;

const new_loader = function(params){

}
module.exports.loader = new_loader;
module.exports.l = new_loader;

const new_popup = function(params){

}
module.exports.popup = new_popup;
module.exports.h = new_popup;