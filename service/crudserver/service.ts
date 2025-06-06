import { Injectable } from '@angular/core';
import { CrudService, CrudDocument } from 'wacom';

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

	constructor() {
		super({
			name: 'NAME',
		});

		this.get();

		this.filteredDocuments(this.NAMEsByAuthor);
	}
}
