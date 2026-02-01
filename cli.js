const path = require("node:path");

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
		home: path.join(__dirname, "page"),
		list: path.join(__dirname, "page"),
		profile: path.join(__dirname, "page"),
		gallery: path.join(__dirname, "page"),
		form: path.join(__dirname, "page"),
		table: path.join(__dirname, "page"),
		content: path.join(__dirname, "page"),
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

const run = (type) => {
	return async (waw) => {
		const options = Object.values(defaults[type]);

		if (waw.argv.length > 1) {
			waw.name = waw.argv[1].toLowerCase();
		} else {
			const t = waw.terminal();

			const name = await t.ask(`Provide name for the ${type} you want to generate:`, {
				required: true,
			});

			waw.name = name.toLowerCase();

			t.close();
		}

		waw.Name = waw.name[0].toUpperCase() + waw.name.slice(1, waw.name.length);

		waw.base = path.join(waw.projectPath, 'src/app', type + 's', waw.name);

		if (options.length > 1) {
			const t = waw.terminal();

			let selected = await t.choose("Select to generate?", Object.keys(defaults[type]), {
				prompt: "Choose number:",
			});

			require(path.join(defaults[type][selected], 'scaffold.js'))(waw);
		} else {
			require(path.join(defaults[type][options[0]], 'scaffold.js'))(waw);
		}
	};
}

module.exports.ng = async (waw) => {
	const t = waw.terminal();

	let selected = await t.choose("What do you want to generate?", Object.keys(defaults), {
		prompt: "Choose number:",
	});

	run(selected);
}

module.exports.alert = run("alert");

module.exports.component = run("component");
module.exports.c = run("component");

module.exports.formcomponent = run("formcomponent");
module.exports.fc = run("formcomponent");

module.exports.icon = run("icon");
module.exports.i = run("icon");

module.exports.interface = run("interface");

module.exports.loader = run("loader");
module.exports.l = run("loader");

module.exports.modal = run("modal");
module.exports.m = run("modal");

module.exports.module = run("module");
module.exports.add = run("module");
module.exports.a = run("module");

module.exports.page = run("page");
module.exports.p = run("page");

module.exports.pipe = run("pipe");

module.exports.selector = run("selector");

module.exports.service = run("service");
module.exports.s = run("service");
