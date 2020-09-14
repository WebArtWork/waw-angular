module.exports = function(waw){
	waw.exe('ng g p '+waw.path+' --module=common/common.module', function(){
		waw.fs.unlinkSync(waw.base+'.pipe.spec.ts');
		let ts = waw.fs.readFileSync(__dirname+'/filter.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.pipe.ts', ts, 'utf8');
		let index = process.cwd() + '/src/app/filters/index.ts';
		if (waw.fs.existsSync(index)) {
			let index_exports = waw.fs.readFileSync(index, 'utf8') || '';
			let code = "export { "+waw.Name+"Pipe } from './"+waw.name+".pipe';";
			if(index_exports.indexOf(code)==-1){
				index_exports += (index_exports.length&&"\n"||"")+code;
				waw.fs.writeFileSync(index, index_exports, 'utf8');
			}
		}
		let config = waw.fs.readFileSync(process.cwd() + '/src/app/common/common.module.ts', 'utf8');
		let search = '/* filters */';
		if(config && config.indexOf(search)>-1){
			config = config.replace(search, search+'\n\t\t'+waw.Name+'Pipe,');
			waw.fs.writeFileSync(process.cwd() + '/src/app/common/common.module.ts', config, 'utf8');
		}
		console.log('Filter has been created');
		process.exit(1);
	});
}