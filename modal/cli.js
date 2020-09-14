module.exports = function(waw){
	waw.exe('ng g c '+waw.path, function(){
		waw.fs.unlinkSync(waw.base+'.component.spec.ts');
		let html = waw.fs.readFileSync(__dirname+'/component.html', 'utf8');
		html = html.split('CNAME').join(waw.Name);
		html = html.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.html', html, 'utf8');
		let scss = waw.fs.readFileSync(__dirname+'/component.scss', 'utf8');
		scss = scss.split('CNAME').join(waw.Name);
		scss = scss.split('NAME').join(waw.name);
		waw.fs.writeFileSync(waw.base+'.component.scss', scss, 'utf8');
		let ts = waw.fs.readFileSync(__dirname+'/component.ts', 'utf8');
		ts = ts.split('CNAME').join(waw.Name);
		ts = ts.split('NAME').join(waw.name);
		waw.add_code({
			file: process.cwd() + '/src/app/app.module.ts',
			search: '/* modals */',
			replace: "/* modals */\n\t\t\t" + waw.name + ": " + waw.Name + "Component,"
		});
		waw.fs.writeFileSync(waw.base+'.component.ts', ts, 'utf8');
		console.log('Modal has been created');
		process.exit(1);
	});

}