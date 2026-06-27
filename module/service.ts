import { Injectable } from '@angular/core';
import { CrudService } from '@wawjs/ngx-crud';
import { CNAME } from '../interfaces/NAME.interface';

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
