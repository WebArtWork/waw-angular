import { CrudDocument } from 'wacom';

export interface CNAME extends CrudDocument<CNAME> {
	name: string;
	description: string;
}
