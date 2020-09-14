module.exports = function(waw){
	waw.exe('ng g m '+waw.path, function(){
		let html = waw.fs.readFileSync(waw.params.template+'/component.html', 'utf8');
		html = html.split('CNAME').join(waw.Name);
		html = html.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.html', html, 'utf8');
		let scss = waw.fs.readFileSync(waw.params.template+'/component.scss', 'utf8');
		scss = scss.split('CNAME').join(waw.Name);
		scss = scss.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.scss', scss, 'utf8');
		let ts = waw.fs.readFileSync(waw.params.template+'/component.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.ts', ts, 'utf8');
		let mod = waw.fs.readFileSync(waw.params.template+'/module.ts', 'utf8');
		mod = mod.split('CNAME').join(waw.Name);
		mod = mod.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.module.ts', mod, 'utf8');
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* '+waw.params.argv[0]+' */',
			replace: '/* '+waw.params.argv[0]+" */{\n\t\tpath: '"+waw.name+"',\n\t\tcanActivate: [MetaGuard],\n\t\tdata: {\n\t\t\tmeta: {\n\t\t\t\ttitle: '"+waw.Name+"'\n\t\t\t}\n\t\t},\n\t\tloadChildren: () => import('./"+waw.path+'/'+waw.name+".module').then(m => m."+waw.Name+"Module)\n\t}, "
		});
		console.log('Page has been created');
		process.exit(1);
	});
}