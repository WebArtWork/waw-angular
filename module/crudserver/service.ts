import { Injectable } from '@angular/core';
import { CNAME } from '../interfaces/NAME.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class CNAMEService extends CrudService<CNAME> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'NAME',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
