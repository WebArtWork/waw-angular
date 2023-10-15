import { FormService } from 'src/app/modules/form/form.service';
import { NgModule, Type } from '@angular/core';

const formcomponents: Type<unknown>[] = [
	/* formcomponents */
]

@NgModule({
	declarations: formcomponents
})
export class FormcomponentsModule {
	constructor(private _form: FormService) {
		formcomponents.forEach(formcomponent => { });
	}
}
