module.exports = function(waw){
	waw.serve = function(domains, urls){
		waw.use(function(req, res, next) {
			let host = req.get('host').toLowerCase();
			if(req.url.indexOf('/api/')==0) return next();
			if(domains.indexOf(host)>=0){
				if(req.url.indexOf('.')>-1){
					res.sendFile(process.cwd()+'/client/dist/client'+req.url);
				}else if(!urls){
					res.sendFile(process.cwd()+'/client/dist/client/index.html');
				}else{
					if(typeof urls == 'string') urls = urls.split(' ');
					for (var i = 0; i < urls.length; i++) {
						if(req.url.indexOf(urls[i])>=0){
							return res.sendFile(process.cwd()+'/client/dist/client/index.html');
						}
					}
					next();
				}
			}else{
				next();
			}
		});
	}
}