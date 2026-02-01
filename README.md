# waw-angular

**waw-angular** is a waw module that provides a small, convention-based **Angular code generator CLI**. It does not run Angular or manage builds; it only scaffolds files into an existing Angular project using templates stored inside this module and the filesystem helpers provided by the waw runner.

This module expects your project to have an Angular workspace layout where generated code lives under `src/app/`.

---

## Commands

All generators derive the target name either from CLI arguments or an interactive prompt, and they scaffold into:

`<project>/src/app/<type>s/<name>/...`

Where `<type>` is the generator type (alerts/components/services/etc).

### Generate entrypoint

- `waw ng` — interactive prompt to choose what to generate (note: current implementation selects a type but does not execute it; use the direct commands below for actual generation)

---

## Generators

### Alert
- `waw alert <name>`

Creates:
- `src/app/alerts/<name>/<name>.component.html`
- `src/app/alerts/<name>/<name>.component.ts`

---

### Component
- `waw component <name>`
- `waw c <name>`

Creates:
- `src/app/components/<name>/<name>.component.html`
- `src/app/components/<name>/<name>.component.ts`

---

### Form Component
- `waw formcomponent <name>`
- `waw fc <name>`

Creates:
- `src/app/formcomponents/<name>/<name>.component.html`
- `src/app/formcomponents/<name>/<name>.component.ts`

Also updates (or creates if missing):
- `src/app/app.formcomponents.ts`

by inserting an import and adding the component to `FORM_COMPONENTS`.

---

### Icon
- `waw icon <name>`
- `waw i <name>`

Creates:
- `src/app/icons/<name>/<name>.component.html`
- `src/app/icons/<name>/<name>.component.ts`

---

### Interface
- `waw interface <name>`

Creates:
- `src/app/interfaces/<name>/<name>.interface.ts`

---

### Loader
- `waw loader <name>`
- `waw l <name>`

Creates:
- `src/app/loaders/<name>/<name>.component.html`
- `src/app/loaders/<name>/<name>.component.ts`

---

### Modal
- `waw modal <name>`
- `waw m <name>`

Creates:
- `src/app/modals/<name>/<name>.component.html`
- `src/app/modals/<name>/<name>.component.ts`

---

### Module (feature scaffold)
- `waw module <name>`
- `waw add <name>`
- `waw a <name>`

Creates a feature-style scaffold under:
- `src/app/modules/...`

using templates in `server/angular/module/`. This template includes page, routes, form, form-component, service, interface, and selector code. The template is intentionally opinionated and assumes you use supporting libraries referenced by the generated TypeScript (for example `wacom` and various app-local modules/services).

> Note: The current template contains duplicated selector writes (same destination written twice) and the selector template paths referenced in the template may not match all Angular project layouts; it is a scaffold starter, not a guarantee of compilation.

---

### Page
- `waw page <role> <pageName?>`
- `waw p <role> <pageName?>`

Pages are scaffolded from one of several built-in page templates:
- `home`, `list`, `profile`, `gallery`, `form`, `table`, `content`

If multiple page templates are available, the generator prompts you to choose which one.

The generator asks for (or reads) a `pageName` and writes a page component + routes into:
- `src/app/pages/<role>/<role>.component.*` and `<role>.routes.ts` (as implemented by the template)

It also injects a route entry into:
- `src/app/app.routes.ts`

at the marker comment `/* <role> */`.

> Important: Route injection assumes your `app.routes.ts` contains the marker comment `/* <role> */` and references `MetaGuard`. The template does not add imports; your project must already define these conventions.

---

### Pipe
- `waw pipe <name>`

Creates:
- `src/app/pipes/<name>/<name>.pipe.ts`

---

### Selector
- `waw selector <name>`

Creates:
- `src/app/selectors/<name>/<name>.component.html`
- `src/app/selectors/<name>/<name>.component.ts`

---

### Service
- `waw service <name>`
- `waw s <name>`

Creates:
- `src/app/services/<name>/<name>.service.ts`

---

## Notes and Constraints

- This module only generates files; it does not format, lint, or register Angular declarations automatically.
- Output paths are fixed by generator type: `src/app/<type>s/<name>/...`.
- Many templates contain placeholder tokens (e.g. `CNAME`, `NAME`, `FILENAME`) that are replaced during generation.
- Some templates assume specific application libraries and folder conventions; treat them as starter scaffolds.

---

## License

MIT © Web Art Work
