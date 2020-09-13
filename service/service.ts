import { Injectable } from '@angular/core';
import { MongoService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CNAMEService {
	public NAMEs: any = [];
	public _NAMEs: any = {};
	constructor(private mongo: MongoService) { 
		this.NAMEs = mongo.get('NAME', (arr, obj) => {
			this._NAMEs = obj;
		});
	}
	create(NAME) {
		if(NAME) reutrn this.save(NAME);
		this.mongo.create('NAME', NAME); 
	}
	update(NAME) {
		this.mongo.afterWhile(NAME, ()=> {
			this.save(NAME);
		});
	}
	save(NAME){
		this.mongo.update('NAME', NAME);
	}
	delete(NAME) {
		this.mongo.delete('NAME', NAME);
	}
}
