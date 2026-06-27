import { CrudDocument } from '@wawjs/ngx-crud';

export interface CNAME extends CrudDocument<CNAME> {
	name: string;
	description: string;
}
