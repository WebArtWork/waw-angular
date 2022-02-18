import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CNAMEService {
	public NAMEs: any = [];
	public _NAMEs: any = {};
	constructor(private mongo: MongoService, private alert: AlertService) { 
		this.NAMEs = mongo.get('NAME', {}, (arr, obj)=>{
			this._NAMEs = obj;
		});
	}
	create(NAME:any={}, text = 'NAME has been created.') {
		if(NAME._id) return this.save(NAME);
		this.mongo.create('NAME', NAME, created=>{
			this.alert.show({ text });
		}); 
	}
	doc(NAMEId){
		if(!this._NAMEs[NAMEId]){
			this._NAMEs[NAMEId] = this.mongo.fetch('NAME', {
				query: {
					_id: NAMEId
				}
			});
		}
		return this._NAMEs[NAMEId];
	}
	update(NAME, text = 'NAME has been updated.') {
		this.mongo.afterWhile(NAME, _=> {
			this.save(NAME, text);
		});
	}
	save(NAME, text = 'NAME has been updated.'){
		this.mongo.update('NAME', NAME, _=>{
			if(text) this.alert.show({ text, unique: NAME });
		});
	}
	delete(NAME, text = 'NAME has been deleted.') {
		this.mongo.delete('NAME', NAME, _=>{
			if(text) this.alert.show({ text });
		});
	}
}
