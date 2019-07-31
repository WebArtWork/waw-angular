const minifier = require('js-minify');
const sass = require('node-sass');
const client = process.cwd()+'/client';
module.exports = function(sd){
	sd.app.use(function(req, res, next){
		if(req.originalUrl.indexOf('.')==-1) return next();
		let url = req.originalUrl.split('?')[0];
		if(url.indexOf('.css')>-1){
			let scss = url.split('.');
			scss.pop();
			scss.push('scss');
			scss = scss.join('.');
			if (sd.fs.existsSync(client+scss)) {
				sass.renderSync({
					outputStyle: 'compressed',
					outFile: client+url,
					file: client+scss,
					sourceMap: true
				});
				return res.sendFile(client+url);
			}else if(sd.fs.existsSync(client+url)){
				return res.sendFile(client+url);
			}
			return res.send('');
		}
		if (sd.fs.existsSync(client+url)) {
			return res.sendFile(client+url);
		}
		if (sd.fs.existsSync(client+'/assets'+url)) {
			return res.sendFile(client+'/assets'+url);
		}
		next();
	});
	sd.app.get('/', (req, res)=>{
		res.sendFile(client+'/index.html');
	});
	if (sd.fs.existsSync(client+'/assets/lab')) {
		let files = sd.getFiles(client+'/assets/lab');
		minifier({
			files: files,
			way: client+'/assets/gen/',
			prefix: sd.config.prefix,
			production: false
		});
	}
	if (sd.fs.existsSync(client+'/lab')) {
		let files = sd.getFiles(client+'/lab');
		minifier({
			files: files,
			way: client+'/gen/',
			prefix: sd.config.prefix,
			production: false
		});
	}
}