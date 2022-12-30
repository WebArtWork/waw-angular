import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

export interface CNAME {
	_id: string;
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class CNAMEService {
	NAMEs: CNAME[] = [];

	_NAMEs: any = {};

	new(): CNAME {
		return {
			_id: '',
			name: '',
			description: ''
		}
	}

	constructor(
		private mongo: MongoService,
		private alert: AlertService
	) {
		this.NAMEs = mongo.get('NAME', {}, (arr: any, obj: any) => {
			this._NAMEs = obj;
		});
	}

	create(
		NAME: CNAME = this.new(),
		callback = (created: CNAME) => {},
		text = 'NAME has been created.'
	) {
		if (NAME._id) {
			this.save(NAME);
		} else {
			this.mongo.create('NAME', NAME, (created: CNAME) => {
				callback(created);
				this.alert.show({ text });
			});
		}
	}

	doc(NAMEId: string): CNAME {
		if(!this._NAMEs[NAMEId]){
			this._NAMEs[NAMEId] = this.mongo.fetch('NAME', {
				query: {
					_id: NAMEId
				}
			});
		}
		return this._NAMEs[NAMEId];
	}

	update(
		NAME: CNAME,
		callback = (created: CNAME) => {},
		text = 'NAME has been updated.'
	): void {
		this.mongo.afterWhile(NAME, ()=> {
			this.save(NAME, callback, text);
		});
	}

	save(
		NAME: CNAME,
		callback = (created: CNAME) => {},
		text = 'NAME has been updated.'
	): void {
		this.mongo.update('NAME', NAME, () => {
			if(text) this.alert.show({ text, unique: NAME });
		});
	}

	delete(
		NAME: CNAME,
		callback = (created: CNAME) => {},
		text = 'NAME has been deleted.'
	): void {
		this.mongo.delete('NAME', NAME, () => {
			if(text) this.alert.show({ text });
		});
	}
}
