import { Component } from '@angular/core';
import { CSERVICEService, CSERVICE } from 'src/app/core/services/SERVICE.service';
import { AlertService, CoreService } from 'wacom';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss'],
	standalone: false
})
export class CNAMEComponent {
	columns = ['name', 'description'];

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
			},
		],
	});

	config = {
		create: (): void => {
			this._form.modal<CSERVICE>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void): void => {
					this._preCreate(created as CSERVICE);

					this._SERVICENAME.create(created as CSERVICE);

					close();
				}
			})
		},
		update: (doc: CSERVICE): void => {
			this._form
				.modal<CSERVICE>(this.form, [], doc)
				.then((updated: CSERVICE): void => {
					this._core.copy(updated, doc);

					this._SERVICENAME.update(doc);
				});
		},
		delete: (doc: CSERVICE): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this CSERVICE?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._SERVICENAME.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: CSERVICE): void => {
					this._form.modalUnique<CSERVICE>('NAME', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	get rows(): CSERVICE[] {
		return this._SERVICENAME.SERVICEs;
	}

	constructor(
		private _SERVICENAME: CSERVICEService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<CSERVICE>(create ? [] : this.rows)
				.then((SERVICEs: CSERVICE[]) => {
					if (create) {
						for (const SERVICE of SERVICEs) {
							this._preCreate(SERVICE);

							this._SERVICENAME.create(SERVICE);
						}
					} else {
						for (const SERVICE of this.rows) {
							if (!SERVICEs.find(
								localCSERVICE => localCSERVICE._id === SERVICE._id
							)) {
								this._SERVICENAME.delete(SERVICE);
							}
						}

						for (const SERVICE of SERVICEs) {
							const localCSERVICE = this.rows.find(
								localCSERVICE => localCSERVICE._id === SERVICE._id
							);

							if (localCSERVICE) {
								this._core.copy(SERVICE, localCSERVICE);

								this._SERVICENAME.update(localCSERVICE);
							} else {
								this._preCreate(SERVICE);

								this._SERVICENAME.create(SERVICE);
							}
						}
					}
				});
		};
	}

	private _preCreate(SERVICE: CSERVICE): void {
		SERVICE.__created;
	}
}
