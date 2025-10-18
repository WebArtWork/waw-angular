import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { CNAME } from '../interfaces/NAME.interface';

@Injectable({
	providedIn: 'root',
})
export class CNAMEService extends CrudService<CNAME> {
	NAMEs: CNAME[] = this.getDocs();

	NAMEsByAuthor: Record<string, CNAME[]> = {};

	constructor() {
		super({
			name: 'NAME',
		});

		this.get();

		this.filteredDocuments(this.NAMEsByAuthor);
	}
}
