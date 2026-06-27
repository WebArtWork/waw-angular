# waw-angular — AI agent guide

**Purpose:** a convention-based Angular code generator CLI. It only scaffolds template files into an existing Angular project under `src/app/`; it never runs, builds, lints, or registers Angular declarations for you.

## How to work with this module
- Generators are registered in `server/angular/cli.js`. Each delegates to a `scaffold.js` inside the matching template folder (e.g. `component/scaffold.js`).
- To add or change a generator: add a template folder with a `scaffold.js` exporting `async (waw) => {}`, register it in the `defaults` map and `module.exports` of `cli.js`. Inside a scaffold use the runner helpers `waw.ensureDir(...)`, `waw.exists(path)`, and `waw.readWrite(src, dest, replacements)`; finish with `process.exit()`.
- Name tokens available in scaffolds: `waw.name` (lowercase) and `waw.Name` (capitalized). Target folder is `waw.base = <projectPath>/src/app/<type>s/<name>`.
- Template placeholder tokens replaced via `waw.readWrite`: `CNAME` (capitalized) and `NAME` (lowercase); pages also use `CROLE`/`ROLE`.

## Generators (run exactly one per invocation)
- Simple component pairs (`.component.html` + `.component.ts`) in `src/app/<type>s/<name>/`: `alert`, `component`(`c`), `icon`(`i`), `loader`(`l`), `modal`(`m`), `selector`.
- Single-file: `interface` → `<name>.interface.ts`, `pipe` → `<name>.pipe.ts`, `service`(`s`) → `<name>.service.ts`.
- `formcomponent`(`fc`): component pair under `src/app/formcomponents/<name>/`, then registers it in `src/app/app.formcomponents.ts` at markers `/* componnets */` (import) and `/* addComponents */` (`FORM_COMPONENTS`).
- `module`(`add`/`a`): full feature under `src/app/modules/<name>/` (pages, forms, form-components, services, interfaces, selectors). Generated code assumes the `@wawjs/ngx-*` libraries.
- `page`(`p`) `<role>`: takes a role, prompts for a template (home/list/profile/gallery/form/table/content), then prompts for a page name, writes files under `src/app/pages/<role>/<pageName>/`, and injects a lazy `MetaGuard` route into `src/app/app.routes.ts` at marker `/* <role> */`.

## Gotchas / known issues (do not assume these work)
- `waw ng` selects a type but never executes it — tell users to call the direct command instead.
- `formcomponent`: the create-if-missing branch references a non-existent template (`app.formcompnents.html`), and the inserted import path uses `form-components/` while files are written to `formcomponents/`. Verify/repair paths after generating.
- `page` route injection requires `app.routes.ts` to already contain the `/* <role> */` marker and to import `MetaGuard`; the generator adds neither.
- Generators do not format, lint, or wire up Angular declarations beyond the formcomponent/page edits above. Treat templates as starters; confirm they compile in the target project.
