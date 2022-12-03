import { Component } from '@angular/core';
import {
	FormConfig,
	FormModules,
	FormService,
	ButtonTypes
} from 'src/app/modules/form/form.service';

import { CSERVICEService, CSERVICE } from "src/app/core/services/SERVICE.service";

@Component({
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss']
})
export class CNAMEComponent {
	columns = ['name', 'description'];

	form: FormConfig = {
		components: [
			{
				module: FormModules.INPUT,
				placeholder: 'fill name',
				label: 'Name',
				focused: true
			},
			{
				module: FormModules.INPUT,
				placeholder: 'fill description',
				label: 'Description',
				input: 'description'
			},
			{
				module: FormModules.BUTTON,
				type: ButtonTypes.PRIMARY
			}
		]
	};

	config = {
		create: () => {
			this.form.components[0].set = '';
			this.form.components[1].set = '';
			this.form.components[2].label = 'Create';
			this._form.modal(this.form, (doc: CSERVICE) => {
				this._SERVICENAME.create(doc);
			});
		},
		update: (doc: CSERVICE) => {
			this.form.components[0].set = doc.name;
			this.form.components[1].set = doc.description;
			this.form.components[2].label = 'Update';
			this._form.modal(this.form, (doc: CSERVICE) => {
				this._SERVICENAME.save(doc);
			});
		},
		delete: (doc: CSERVICE) => {
			this._SERVICENAME.delete(doc);
		}
	};

	get rows(): CSERVICE[] {
		return this._SERVICENAME.SERVICEs;
	}

	constructor(
		private _form: FormService,
		private _SERVICENAME: CSERVICEService
	) {}
}
