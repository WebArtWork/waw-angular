import { FormService } from '../../modules/form/form.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
/* componnets */

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		/* declarations */
	],
})
export class FormcomponentsModule {
	constructor(private _form: FormService) {
		/* addComponents */
	}
}
