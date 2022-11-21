import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CNAMEService {
	NAMEs: any = [];

	_NAMEs: any = {};

	constructor(
		private mongo: MongoService,
		private alert: AlertService
	) {
		this.NAMEs = mongo.get('NAME', {}, (arr: any, obj: any) => {
			this._NAMEs = obj;
		});
	}

	create(NAME:any={}, text = 'NAME has been created.') {
		if(NAME._id) return this.save(NAME);
		this.mongo.create('NAME', NAME, () => {
			this.alert.show({ text });
		});
	}

	doc(NAMEId: string): any{
		if(!this._NAMEs[NAMEId]){
			this._NAMEs[NAMEId] = this.mongo.fetch('NAME', {
				query: {
					_id: NAMEId
				}
			});
		}
		return this._NAMEs[NAMEId];
	}

	update(NAME: any, text = 'NAME has been updated.'): void {
		this.mongo.afterWhile(NAME, ()=> {
			this.save(NAME, text);
		});
	}

	save(NAME: any, text = 'NAME has been updated.'): void {
		this.mongo.update('NAME', NAME, () => {
			if(text) this.alert.show({ text, unique: NAME });
		});
	}

	delete(NAME: any, text = 'NAME has been deleted.'): void {
		this.mongo.delete('NAME', NAME, () => {
			if(text) this.alert.show({ text });
		});
	}
}
