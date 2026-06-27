# waw-angular

**waw-angular** is a waw module that provides a convention-based **Angular code generator CLI**. It does not run Angular, build, lint, or register declarations; it only scaffolds template files into an existing Angular project. Generated code lives under `src/app/`.

All logic lives in [`server/angular/cli.js`](cli.js), which exposes one command per generator. Each generator delegates to a `scaffold.js` file inside the matching template folder (e.g. [`server/angular/component/scaffold.js`](component/scaffold.js)).

> 🤖 **AI agents:** read [`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md) first — it is the agent-oriented working guide for this module (conventions to follow, how to extend it, and gotchas to avoid). This README is the human reference.

---

## How generation works

Every command is produced by a shared `run(type)` factory in [`cli.js`](cli.js):

1. **Name resolution** — the target name is taken from the first CLI argument (`waw <cmd> <name>`); if omitted, the user is prompted via `waw.terminal()`. For the `page` type the prompt asks for a **role** instead of a name.
2. **Name tokens** — `waw.name` is the lowercased name and `waw.Name` is the capitalized form.
3. **Target folder** — `waw.base = <projectPath>/src/app/<type>s/<name>` (note the pluralized type, e.g. `components`, `services`, `pages`).
4. **Template selection** — if a type has more than one template variant (only `page` does), the user is prompted to choose; otherwise the single `default` template runs.
5. The selected `scaffold.js` is required and invoked with `waw`. Scaffolds use runner filesystem helpers — `waw.ensureDir(...)`, `waw.exists(path)`, and `waw.readWrite(src, dest, replacements)` — then print a message and call `process.exit()`.

### Template tokens

Templates contain placeholder tokens replaced by `waw.readWrite`. Simple generators pass:

- `CNAME` → `waw.Name` (capitalized)
- `NAME` → `waw.name` (lowercase)

Page generators additionally pass `CROLE`/`ROLE` (the role) and use `CNAME`/`NAME` for the page name. Some template files reference other tokens (e.g. `FILENAME` in `formcomponent/component.ts`) that the corresponding generator does **not** currently replace — see notes below.

---

## Generate entrypoint

### `waw ng`
Interactive prompt to choose what to generate.

> ⚠️ Known issue: the handler calls `run(selected)` but never invokes the returned function, so `waw ng` selects a type but does **not** actually generate anything. Use the direct commands below.

---

## Simple generators

These create files directly inside `waw.base` (`src/app/<type>s/<name>/`).

| Command | Aliases | Output files (under `src/app/<type>s/<name>/`) |
|---|---|---|
| `waw alert <name>` | — | `<name>.component.html`, `<name>.component.ts` |
| `waw component <name>` | `waw c` | `<name>.component.html`, `<name>.component.ts` |
| `waw icon <name>` | `waw i` | `<name>.component.html`, `<name>.component.ts` |
| `waw loader <name>` | `waw l` | `<name>.component.html`, `<name>.component.ts` |
| `waw modal <name>` | `waw m` | `<name>.component.html`, `<name>.component.ts` |
| `waw selector <name>` | — | `<name>.component.html`, `<name>.component.ts` |
| `waw interface <name>` | — | `<name>.interface.ts` |
| `waw pipe <name>` | — | `<name>.pipe.ts` |
| `waw service <name>` | `waw s` | `<name>.service.ts` |

---

## Form component

### `waw formcomponent <name>` / `waw fc <name>`

Creates the component files under `src/app/formcomponents/<name>/`:
- `<name>.component.html`
- `<name>.component.ts`

It then registers the component in `src/app/app.formcomponents.ts`:
- inserts an import at the marker comment `/* componnets */`
- adds the component to the `FORM_COMPONENTS` record at the marker `/* addComponents */`

> ⚠️ Known issues in the current implementation:
> - If `app.formcomponents.ts` does not exist, the generator tries to create it from `app.formcompnents.html`, but the template file shipped in this folder is named `app.formcomponents.ts`, so the create-if-missing branch does not work. The registration markers assume the file already exists.
> - The inserted import path points at `src/app/form-components/<name>/...` (hyphenated), while the files are actually generated under `src/app/formcomponents/<name>/...` (no hyphen). Fix the import path or the output folder to match your project.
> - `formcomponent/component.ts` uses a `FILENAME` token that the generator does not replace.

---

## Module (feature scaffold)

### `waw module <name>` / `waw add <name>` / `waw a <name>`

Generates a full feature scaffold under `src/app/modules/<name>/` from the templates in [`server/angular/module/`](module/). Created files:

- `pages/<name>s/<name>s.component.html`, `<name>s.component.ts`, `<name>s.routes.ts`
- `forms/<name>.form.ts`
- `form-components/<name>/<name>.component.html`, `<name>.component.ts`
- `services/<name>.service.ts`
- `interfaces/<name>.interface.ts`
- `selectors/<name>/<name>.component.html`, `<name>.component.ts`

The generated TypeScript assumes the `@wawjs/ngx-*` libraries (e.g. `@wawjs/ngx-crud`, `@wawjs/ngx-form`, `@wawjs/ngx-ui`, `@wawjs/ngx-translate`) and app-local conventions. Treat it as an opinionated starter, not a guarantee of compilation.

> Note: `waw add` / `waw a` are also used by the core and sem modules for backend module scaffolding. Which one runs depends on module load order in the current project.

---

## Page

### `waw page <role>` / `waw p <role>`

Scaffolds a page for a given **role**. The `role` comes from the CLI argument or an interactive prompt and determines `waw.base = src/app/pages/<role>`.

You are then prompted to pick a page template (all seven are available):

`home`, `list`, `profile`, `gallery`, `form`, `table`, `content`

After choosing a template, the generator **always prompts interactively for the page name** (it is not read from the CLI). Files are written into `src/app/pages/<role>/<pageName>/`, with the set depending on the template:

| Template | Files generated under `src/app/pages/<role>/<pageName>/` |
|---|---|
| `home` | `component.html`, `component.ts`, `routes.ts` |
| `content` | `component.html`, `component.ts`, `routes.ts` |
| `form` | `component.html`, `component.ts`, `interface.ts`, `schema.ts`, `routes.ts` |
| `gallery` | `component.html`, `component.ts`, `routes.ts`, `interface.ts`, `const.ts` |
| `profile` | `component.html`, `component.ts`, `routes.ts`, `const.ts`, `interface.ts` |
| `table` | `component.html`, `component.ts`, `const.ts`, `interface.ts`, `routes.ts` |
| `list` | `component.html`, `component.ts`, `routes.ts`, `const.ts`, `interface.ts`, plus a child component `<pageName>-item/<pageName>-item.component.html` and `.ts` |

Each file uses `<pageName>` as its base name (e.g. `<pageName>.component.ts`).

The generator also injects a lazy route into `src/app/app.routes.ts` at the marker comment `/* <role> */`:

```ts
{
    path: '<pageName>',
    canActivate: [MetaGuard],
    data: { meta: { title: '<PageName>' } },
    loadChildren: () => import('./pages/<role>/<pageName>/<pageName>.routes').then(r => r.routes)
}
```

> Important: Route injection requires your `app.routes.ts` to already contain the marker comment `/* <role> */` and to import/define `MetaGuard`. The generator does not add the import.

---

## Module Manifest

The module is defined by [`module.json`](module.json):

```json
{
    "repo": "https://github.com/WebArtWork/waw-angular.git",
    "name": "Angular",
    "dependencies": {}
}
```

It has no runtime dependencies and contributes only CLI generator commands.

---

## Notes and Constraints

- This module only generates files; it does not format, lint, or register Angular declarations automatically (except the formcomponent and page route-table edits described above).
- Output paths are fixed by generator type: `src/app/<type>s/<name>/...`.
- Templates assume specific app libraries and folder conventions; treat them as starter scaffolds.
- Every generator ends by calling `process.exit()`, so only one generation runs per invocation.

---

## License

MIT © Web Art Work
