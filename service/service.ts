import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CNAMEService {
	public NAMEs: any = [];
	constructor(private mongo: MongoService, private alert: AlertService) { 
		this.NAMEs = mongo.get('NAME');
	}
	create(NAME:any={}) {
		if(NAME._id) return this.save(NAME);
		this.mongo.create('NAME', NAME, created=>{
			this.alert.show({
				text: 'NAME has been created.'
			});
		}); 
	}
	doc(NAMEId){
		return mongo.fetch('NAME', {
			query: {
				_id: NAMEId
			}
		});
	}
	update(NAME) {
		this.mongo.afterWhile(NAME, ()=> {
			this.save(NAME);
		});
	}
	save(NAME){
		this.mongo.update('NAME', NAME, ()=>{
			this.alert.show({
				text: 'NAME has been updated.'
			});
		});
	}
	delete(NAME) {
		this.mongo.delete('NAME', NAME, ()=>{
			this.alert.show({
				text: 'NAME has been deleted.'
			});
		});
	}
}
