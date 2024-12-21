import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CNAMEService } from '../../services/NAME.service';
import { CNAME } from '../../interfaces/NAME.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { NAMEFormComponents } from '../../formcomponents/NAME.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './PNAME.component.html',
	styleUrls: ['./PNAME.component.scss'],
	standalone: false,
})
export class PCNAMEComponent {
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
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as CNAME);

					await firstValueFrom(
						this._NAMEService.create(created as CNAME)
					);

					this.setRows();
				},
			});
		},
		update: (doc: CNAME): void => {
			this._form
				.modal<CNAME>(this.form, [], doc)
				.then((updated: CNAME) => {
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
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._NAMEService.delete(doc));

							this.setRows();
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: CNAME): void => {
					this._form.modalUnique<CNAME>('NAME', 'url', doc);
				},
			},
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		],
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

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<CNAME>(create ? [] : this.rows)
				.then(async (NAMEs: CNAME[]) => {
					if (create) {
						for (const NAME of NAMEs) {
							this._preCreate(NAME);

							await firstValueFrom(
								this._NAMEService.create(NAME)
							);
						}
					} else {
						for (const NAME of this.rows) {
							if (
								!NAMEs.find(
									(localCNAME) => localCNAME._id === NAME._id
								)
							) {
								await firstValueFrom(
									this._NAMEService.delete(NAME)
								);
							}
						}

						for (const NAME of NAMEs) {
							const localCNAME = this.rows.find(
								(localCNAME) => localCNAME._id === NAME._id
							);

							if (localCNAME) {
								this._core.copy(NAME, localCNAME);

								await firstValueFrom(
									this._NAMEService.update(localCNAME)
								);
							} else {
								this._preCreate(NAME);

								await firstValueFrom(
									this._NAMEService.create(NAME)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(NAME: CNAME): void {
		delete NAME.__created;
	}
}
