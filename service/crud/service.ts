import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface CNAME extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class CNAMEService extends CrudService<CNAME> {
	NAMEs: CNAME[] = this.getDocs();

	NAMEsByAuthor: Record<string, CNAME[]> = {};

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

		this.get();

		this.filteredDocuments(this.NAMEsByAuthor);
	}
}
