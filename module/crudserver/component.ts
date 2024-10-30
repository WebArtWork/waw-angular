import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CNAMEService } from '../../services/NAME.service';
import { CNAME } from '../../interfaces/NAME.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { NAMEFormComponents } from '../../formcomponents/NAME.formcomponents';

@Component({
	templateUrl: './NAMEs.component.html',
	styleUrls: ['./NAMEs.component.scss']
})
export class CNAMEsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('NAME', NAMEFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._NAMEService.setPerPage.bind(this._NAMEService),
		allDocs: false,
		create: (): void => {
			this._form.modal<CNAME>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._NAMEService.create(created as CNAME);

					close();
				}
			});
		},
		update: (doc: CNAME): void => {
			this._form.modal<CNAME>(this.form, [], doc).then((updated: CNAME) => {
				this._core.copy(updated, doc);

				this._NAMEService.update(doc);
			});
		},
		delete: (doc: CNAME): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this NAME?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._NAMEService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: CNAME): void => {
					this._form.modalUnique<CNAME>('NAME', 'url', doc);
				}
			}
		]
	};

	rows: CNAME[] = [];

	constructor(
		private _translate: TranslateService,
		private _NAMEService: CNAMEService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._NAMEService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;
}
