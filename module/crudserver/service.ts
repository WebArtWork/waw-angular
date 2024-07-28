import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';
import { CNAME } from "../interfaces/NAME.interface";

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
				name: 'budgettransaction'
			},
			_http,
			_store,
			_alert,
			_core
		);
		this.get().subscribe((NAMEs: CNAME[]) =>
			this.NAMEs.push(...NAMEs)
		);
	}
}
