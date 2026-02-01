const exe = require("child_process").execSync;
const path = require("node:path");
const fs = require("node:fs");

/* Angular Generate process */
const defaults = {
	alert: {
		default: path.join(__dirname, "alert"),
	},
	component: {
		default: path.join(__dirname, "component"),
	},
	formcomponent: {
		default: path.join(__dirname, "formcomponent"),
	},
	icon: {
		default: path.join(__dirname, "icon"),
	},
	interface: {
		default: path.join(__dirname, "interface"),
	},
	loader: {
		default: path.join(__dirname, "loader"),
	},
	modal: {
		default: path.join(__dirname, "modal"),
	},
	module: {
		default: path.join(__dirname, "module"),
	},
	page: {
		home: path.join(__dirname, "page", "home"),
		list: path.join(__dirname, "page", "list"),
		profile: path.join(__dirname, "page", "profile"),
		gallery: path.join(__dirname, "page", "gallery"),
		form: path.join(__dirname, "page", "form"),
		table: path.join(__dirname, "page", "table"),
		content: path.join(__dirname, "page", "content"),
	},
	pipe: {
		default: path.join(__dirname, "pipe"),
	},
	selector: {
		default: path.join(__dirname, "selector"),
	},
	service: {
		default: path.join(__dirname, "service"),
	},
};


const initialize = (waw) => {
	waw.argv.shift();

	if (!waw.argv.length) {
		console.log("Please provide name");

		process.exit();
	}

	waw.name = waw.argv[waw.argv.length - 1];

	if (waw.name.startsWith("ngx-")) {
		waw.name = waw.argv[waw.argv.length - 1].replace("ngx-", "");

		waw.argv[waw.argv.length - 1] = waw.name;

		waw.repo = "https://github.com/WebArtWork/ngx-" + waw.name + ".git";
	} else {
		waw.Name =
			waw.name[0].toUpperCase() + waw.name.slice(1, waw.name.length);
	}

	waw.base = path.join(process.cwd(), "src", "app", waw.folder);

	for (let i = 0; i < waw.argv.length - 1; i++) {
		waw.argv[i] = waw.argv[i].toLowerCase();
	}

	waw.base = path.join(waw.base, waw.argv.join(path.sep));

	waw.component = [waw.folder, waw.argv.join("/")].join("/");

	waw.fileName = waw.name;

	for (let i = 0; i < waw.fileName.length; i++) {
		if (waw.fileName[i].match(/^[A-Z]*$/)) {
			waw.fileName =
				waw.fileName.slice(0, i) + "-" + waw.fileName.slice(i);

			i++;
		}
	}

	waw.fileName = waw.fileName.toLowerCase();

	const _argv = waw.argv.slice();

	_argv.pop();

	waw.fileComponent = [waw.folder, _argv.join("/"), waw.fileName].join("/");

	const base = waw.base.split(path.sep);

	base.pop();

	waw.base = path.join(base.join(path.sep), waw.fileName);
};
const template = (waw, next) => {
	const base = path.join(process.cwd(), "template");
	const customizations = waw.getDirectories(base);
	for (const customization of customizations) {
		const def = path.basename(customization);
		if (!defaults[def]) {
			defaults[def] = {};
		}
		const customs = waw.getDirectories(customization);
		for (const custom of customs) {
			const name = path.basename(custom);
			defaults[def][name] = custom;
		}
	}

	if (Object.keys(defaults[waw.module]).length > 1) {
		let text = "Which module you want to use?",
			counter = 0,
			repos = {};
		for (let key in defaults[waw.module]) {
			repos[++counter] = defaults[waw.module][key];
			text += "\n" + counter + ") " + key;
		}
		text += "\nChoose number: ";
		waw.readline.question(text, (answer) => {
			if (!answer || !repos[parseInt(answer)]) {
				template(waw, next);
			} else {
				waw.template = repos[parseInt(answer)];
				next();
			}
		});
	} else {
		waw.template = defaults[waw.module].default;
		next();
	}
};
const install = (waw, location, callback) => {
	const json = waw.readJson(path.join(location, "module.json"));
	if (json && json.dependencies) {
		waw.each(
			json.dependencies,
			(name, version, next) => {
				waw.npmi(
					{
						path: process.cwd(),
						name,
						version,
						save: true,
					},
					next
				);
			},
			() => {
				callback();
			}
		);
	} else {
		callback();
	}
};
const fetchrepo = (waw) => {
	fs.mkdirSync(waw.base, {
		recursive: true,
	});

	waw.fetch(waw.base, waw.repo, (err) => {
		if (err) console.log("Repository was not found");
		else console.log("Code is successfully installed");
		install(waw, waw.base, () => {
			process.exit();
		});
	});
};
const run = (module, folder) => {
	return (waw) => {
		waw.module = module;
		waw.folder = folder;
		initialize(waw);
		if (waw.repo) {
			fetchrepo(waw);
		} else {
			template(waw, () => {
				require(path.join(waw.template, "cli.js"))(waw);
			});
		}
	};
};
module.exports.alert = run("alert", "alerts");

module.exports.component = run("component", "page-components");
module.exports.c = run("component", "page-components");

module.exports.formcomponent = run("formcomponent", "form-components");
module.exports.fc = run("formcomponent", "form-components");

module.exports.icon = run("icon", "icons");
module.exports.i = run("icon", "icons");

module.exports.interface = run("interface", "interfaces");

module.exports.loader = run("loader", "loaders");
module.exports.l = run("loader", "loaders");

module.exports.modal = run("modal", "modals");
module.exports.m = run("modal", "modals");

module.exports.module = run("module", "modules");
module.exports.add = run("module", "modules");
module.exports.a = run("module", "modules");

module.exports.page = run("page", "pages");
module.exports.p = run("page", "pages");

module.exports.pipe = run("pipe", "pipes");

module.exports.popup = run("popup", "popups");

module.exports.selector = run("selector", "selectors");

module.exports.service = run("service", "services");
module.exports.s = run("service", "services");

/* Fetch Angular Modules */
const fetch_module = (waw, location, callback) => {
	location = path.normalize(location);
	if (!fs.existsSync(location + "/module.json")) {
		return callback(false);
	}
	let json = waw.readJson(location + "/module.json");
	if (!json.repo) {
		return callback(false);
	}
	waw.fetch(location, json.repo, (err) => {
		callback(true);
		// waw.install(waw, location, callback);
	});
};
const fetch_modules = async (waw) => {
	if (waw.argv.length > 1) {
		fetch_module(
			waw,
			process.cwd() + "/src/app/modules/" + waw.argv[1].toLowerCase(),
			(done) => {
				if (done) {
					console.log(
						"Module " + waw.argv[1] + " were fetched from the repo"
					);
				} else {
					console.log(
						"Module " + waw.argv[1] + " don't have an repo"
					);
				}
				process.exit();
			}
		);
	} else {
		const folders = waw.getDirectories(process.cwd() + "/src/app/modules");
		let counter = folders.length;
		for (let i = 0; i < folders.length; i++) {
			fetch_module(waw, folders[i], () => {
				if (--counter === 0) {
					console.log(
						"All possible modules were fetched from their repositories"
					);
					process.exit();
				}
			});
		}
	}
};
module.exports.fetch = fetch_modules;
module.exports.f = fetch_modules;

/* waw CLI for Angular Components Customization */
const generate = async (waw) => {
	waw.argv.shift();

	if (waw.argv.length && defaults[waw.argv[0].toLowerCase()]) {
		waw.element = waw.argv[0].toLowerCase();
	}

	if (!waw.element) {
		let text = "Which element you want to customize?",
			counter = 0,
			repos = {};
		for (let key in defaults) {
			repos[++counter] = key;
			text += "\n" + counter + ") " + key;
		}
		text += "\nChoose number: ";
		return waw.readline.question(text, function (answer) {
			if (!answer || !repos[parseInt(answer)]) return new_project();
			waw.element = repos[parseInt(answer)];
			generate(waw);
		});
	}

	if (!defaults[waw.element]) {
		delete waw.element;
		return generate(waw);
	}

	if (waw.argv.length > 1) {
		waw.name = waw.argv[1].toLowerCase();
	}

	if (!waw.name) {
		return waw.readline.question(
			"Provide name for customization: ",
			function (answer) {
				waw.name = answer.toLowerCase();
				generate(waw);
			}
		);
	}

	const loc = path.join(process.cwd(), "template", waw.element, waw.name);

	if (fs.existsSync(loc)) {
		console.log("Customization already exists");
		process.exit(0);
	}

	fs.mkdirSync(loc, {
		recursive: true,
	});

	exe("cp -rf " + path.join(__dirname, waw.element) + " " + loc);

	console.log("Customization " + waw.element + " " + waw.name + " created");

	process.exit();
};
module.exports.generate = generate;
module.exports.g = generate;

/* waw SYNC for modules, formcomponents and icons with install npm */
const update_module = async (waw, module, callback) => {
	const branch = waw.argv.length > 2 ? waw.argv[2] : "master";

	const moduleGit = path.join(module.location, ".git");

	const local = path.join(process.cwd(), ".git", module.name);

	const localGit = path.join(process.cwd(), ".git", module.name, ".git");

	if (fs.existsSync(local)) {
		fs.rmSync(local, { recursive: true });
	}

	if (fs.existsSync(moduleGit)) {
		fs.rmSync(moduleGit, { recursive: true });
	}

	fs.mkdirSync(local, { recursive: true });

	waw.fetch(
		local,
		module.config.repo,
		() => {
			fs.renameSync(localGit, moduleGit);

			if (fs.existsSync(local)) {
				fs.rmSync(local, { recursive: true });
			}

			exe("git add --all .", {
				cwd: module.location,
			});

			try {
				exe('git commit -m "' + waw.argv[1] + '"', {
					cwd: module.location,
				});

				exe('git push origin "' + branch + '"', {
					cwd: module.location,
				});
			} catch (error) {}

			fs.rmSync(moduleGit, { recursive: true });

			callback();
		},
		branch,
		false
	);
};
const install_packages = (waw, dependencies) => {
	waw.each(dependencies, (name, version, next) => {
		if (
			!fs.existsSync(
				path.resolve(process.cwd(), "node_modules", name.split("@")[0])
			)
		) {
			console.log("Installing node module " + name.split("@")[0]);
			waw.npmi(
				{
					path: process.cwd(),
					name,
					version,
					save: true,
				},
				next
			);
		}
	});
};
const fetch_component = async (waw, componentPath, type, callback) => {
	const name = path.basename(componentPath);

	const response = await fetch(
		`https://webart.work/api/registry/ngx/${type}/${name}`
	);

	if (response.ok) {
		const resp = await response.json();

		if (resp && resp.repo) {
			waw.fetch(
				componentPath,
				resp.repo,
				callback,
				resp.branch || "master"
			);
		} else if (resp) {
			for (const file in resp.files) {
				fs.writeFileSync(
					path.join(componentPath, file),
					resp.files[file],
					"utf8"
				);
			}
			callback();
		} else {
			callback();
		}
	} else {
		callback();
	}
};
const update_component = async (waw, componentPath, type, callback) => {
	const name = path.basename(componentPath);

	const body = {};

	const files = waw.getFilesRecursively(componentPath);

	for (const file of files) {
		const filePath = path.normalize(file).replace(componentPath, "");

		body[filePath.slice(1)] = fs.readFileSync(file, "utf-8");
	}

	await fetch(`https://webart.work/api/registry/ngx/${type}/${name}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	console.log(`Component ${name} has been updated`);

	callback();
};
const fetch_icons = (waw) => {
	const icons = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "core", "icons")
	);

	let countdown = icons.length;
	if (!countdown) {
		console.log("All icons were synchronized");

		process.exit();
	}
	icons.forEach((iconPath) => {
		fetch_component(waw, iconPath, "icon", () => {
			if (--countdown === 0) {
				console.log("All icons were synchronized");

				process.exit();
			}
		});
	});
};
const update_icons = (waw) => {
	const icons = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "core", "icons")
	);

	let countdown = icons.length;
	if (!countdown) {
		console.log("All icons were updated and synchronized");

		process.exit();
	}
	icons.forEach((iconPath) => {
		update_component(waw, iconPath, "icon", () => {
			if (--countdown === 0) {
				console.log("All icons were updated and synchronized");

				process.exit();
			}
		});
	});
};
const fetch_formcomponents = (waw) => {
	if (waw.isDone) {
		return;
	}
	waw.isDone = true;

	const formcomponents = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "core", "formcomponents")
	);

	let countdown = formcomponents.length;
	if (!countdown) {
		console.log("All form components were synchronized");

		fetch_icons(waw);
	}
	formcomponents.forEach((formcomponentPath) => {
		fetch_component(waw, formcomponentPath, "formcomponent", () => {
			if (--countdown === 0) {
				console.log("All form components were synchronized");

				fetch_icons(waw);
			}
		});
	});
};
const update_formcomponents = (waw) => {
	if (waw.isDone) {
		return;
	}
	waw.isDone = true;

	const formcomponents = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "core", "formcomponents")
	);

	let countdown = formcomponents.length;
	if (!countdown) {
		console.log("All form components were updated and synchronized");

		update_icons(waw);
	}
	formcomponents.forEach((formcomponentPath) => {
		update_component(waw, formcomponentPath, "formcomponent", () => {
			if (--countdown === 0) {
				console.log(
					"All form components were updated and synchronized"
				);

				update_icons(waw);
			}
		});
	});
};
let countdown;
const sync = async (waw, modules) => {
	for (let i = modules.length - 1; i >= 0; i--) {
		modules[i] = {
			config: waw.readJson(path.join(modules[i], "module.json")),
			name: path.basename(modules[i]),
			location: modules[i],
		};

		if (typeof modules[i].config.dependencies === "object") {
			install_packages(waw, modules[i].config.dependencies);
		}

		if (!modules[i].config.repo) {
			--countdown;

			modules.splice(i, 1);
		}
	}

	if (waw.argv.length === 1) {
		if (!countdown) {
			console.log("All modules were synchronized");

			fetch_formcomponents(waw);
		}
		const update = (_module) => {
			fetch_module(waw, _module.location, () => {
				if (_module.config.repo) {
					console.log(`Module ${_module.name} has been synchronized`);
				}
				if (--countdown === 0) {
					console.log("All modules were synchronized");

					fetch_formcomponents(waw);
				}
			});
		};

		for (const _module of modules) {
			update(_module);
		}
	} else if (waw.argv.length > 1) {
		const update = (_module) => {
			update_module(waw, _module, () => {
				if (_module.config.repo) {
					console.log(`Module ${_module.name} has been updated`);
				}

				if (--countdown === 0) {
					console.log("All modules were updated and synchronized");

					update_formcomponents(waw);
				}
			});
		};
		for (const _module of modules) {
			update(_module);
		}
	}
};
const _sync = (waw) => {
	if (waw.argv.length > 1) {
		waw.rootconfig = waw.readJson(path.join(waw.waw_root, "server.json"));
	}

	const coreModules = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "core", "modules")
	);

	const rootModules = waw.getDirectories(
		path.join(process.cwd(), "src", "app", "modules")
	);

	countdown = coreModules.length + rootModules.length;

	sync(waw, coreModules);

	sync(waw, rootModules);
};
module.exports.sync = _sync;
