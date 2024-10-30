import { CrudDocument } from 'wacom';

export interface CNAME extends CrudDocument {
	name: string;
	description: string;
}
