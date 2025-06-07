import { Injectable } from '@angular/core';
import { CrudService, CrudDocument } from 'wacom';

export const NAMEFormComponents = {
	formId: 'NAME',
	title: 'CNAME',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill NAME title',
				},
				{
					name: 'Label',
					value: 'Title',
				},
			],
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill NAME description',
				},
				{
					name: 'Label',
					value: 'Description',
				},
			],
		},
	],
};

export interface CNAME extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class CNAMEService extends CrudService<CNAME> {
	constructor() {
		super({
			name: 'NAME',
		});
	}
}
