import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument
} from 'wacom';

export interface CNAME extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class CNAMEService extends CrudService<CNAME> {
	NAMEs: CNAME[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'NAME'
			},
			_http,
			_store,
			_alert,
			_core
		);
		this.get().subscribe((NAMEs: CNAME[]) =>
			this.NAMEs.push(...NAMEs)
		);
		_core.on('NAME_create', (NAME: CNAME) => {
			this.NAMEs.push(NAME);
		});
		_core.on('NAME_delete', (NAME: CNAME) => {
			this.NAMEs.splice(
				this.NAMEs.findIndex((o) => o._id === NAME._id),
				1
			);
		});
	}
}
