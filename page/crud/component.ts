import { Component } from '@angular/core';
import { FormConfig, FormModules, FormOutputs, FormService } from 'src/app/modules/form/form.service';

@Component({
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss']
})
export class CNAMEComponent {
	columns = ['name', 'description'];

	config = {
		create: () => {
			this._form.modal(this.formCreate, (doc: CNAME) => {
				this._NAME.create(user);
			});
		},
		update: (doc: CNAME) => {
			this.formUpdate.components[0].set = user.email;
			this.formUpdate.components[1].set = user.name;
			this._form.modal(this.formUpdate, (doc: CNAME) => {
				this._NAME.save(user);
			});
		},
		delete: (doc: CNAME) => {
			this._form.modal(this.formVerify, () => {
				this._NAME.delete(user);
			});
		}
	};

	config: FormConfig = {
		components: [
			{
				module: FormModules.INPUT,
				placeholder: 'fill name',
				label: 'Name',
				focused: true
			},
			{
				module: FormModules.INPUT,
				placeholder: 'fill name',
				label: 'Name',
				input: 'name'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY,
				label: 'Create'
			}
		]
	};

	get rows(): CNAME[] {
		return this._NAME.docs;
	}

	constructor(
		private _form: FormService,
		private _NAME: CNAMEService
	) {}
}
