import { Injectable } from '@angular/core';
import { CNAME } from '../interfaces/NAME.interface';
import { CrudService } from 'wacom';

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
