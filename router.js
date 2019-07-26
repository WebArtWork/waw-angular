const minifier = require('js-minify');
const fontifier = require('svg-fontify');
const client = process.cwd()+'/client';
module.exports = function(sd){
	sd.app.use(function(req, res, next){
		if(req.originalUrl.indexOf('.')==-1) return next();
		let url = req.originalUrl.split('?')[0];
		if (sd.fs.existsSync(client+url)) {
			return res.sendFile(client+url);
		}
		if (sd.fs.existsSync(client+'/assets'+url)) {
			return res.sendFile(client+'/assets'+url);
		}
		next();
	});
	sd.app.use(require('node-sass-middleware')({
		src: client,
		dest: client,
		debug: !sd.config.production,
		outputStyle: 'compressed',
		force: !sd.config.production
	}));
	sd.app.get('/', (req, res)=>{
		res.sendFile(client+'/index.html');
	});
	if (sd.fs.existsSync(client+'/assets/lab')) {
		let files = sd.getFiles(client+'/assets/lab');
		minifier({
			files: files,
			way: client+'/assets/gen',
			prefix: sd.config.prefix,
			production: false
		});
	}
	if (sd.fs.existsSync(client+'/lab')) {
		let files = sd.getFiles(client+'/lab');
		minifier({
			files: files,
			way: client+'/gen',
			prefix: sd.config.prefix,
			production: false
		});
	}
	if (sd.fs.existsSync(client+'/assets/icons')) {
		let files = sd.getFiles(client+'/assets/icons');
		fontifier({
			name: 'public',
			files: files,
			way: client+'/assets/gen',
			prefix: sd.config.prefix
		});
	}
	if (sd.fs.existsSync(client+'/icons')) {
		let files = sd.getFiles(client+'/icons');
		fontifier({
			name: 'public',
			files: files,
			way: client+'/gen',
			prefix: sd.config.prefix
		});
	}
}