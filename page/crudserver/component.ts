import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import {
	CSERVICEService,
	CSERVICE,
} from 'src/app/core/services/SERVICE.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss'],
	standalone: false
})
export class CNAMEComponent {
	columns = ['name', 'description'];

	rows: CSERVICE[] = [];

	form: FormInterface = this._form.getForm('NAME', {
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
					}
				]
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
					}
				]
			}
		]
	});

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._SERVICENAME.setPerPage.bind(this._SERVICENAME),
		allDocs: false,
		create: (): void => {
			this._form.modal<CSERVICE>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._SERVICENAME.create(created as CSERVICE, {
						alert: this._translate.translate(
							'CSERVICE.CSERVICE has been created'
						),
						callback: (): void => {
							this.setRows();

							close();
						}
					});
				}
			});
		},
		update: (doc: CSERVICE) => {
			this._form
				.modal<CSERVICE>(this.form, [], doc)
				.then((updated: CSERVICE): void => {
					this._core.copy(updated, doc);

					this._SERVICENAME.update(doc, {
						alert: this._translate.translate(
							'CSERVICE.CSERVICE has been updated'
						)
					});
				});
		},
		delete: (doc: CSERVICE) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._SERVICENAME.delete(doc, {
								alert: this._translate.translate(
									'CSERVICE.CSERVICE has been deleted'
								),
								callback: (): void => {
									this.setRows();
								}
							});
						}
					}
				]
			});
		}
	};

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _SERVICENAME: CSERVICEService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page) {
		this._page = page;

		this._core.afterWhile(
			this,
			(): void => {
				this._SERVICENAME.get({ page }).subscribe((rows): void => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;
}
