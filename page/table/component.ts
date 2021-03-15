import { Component } from '@angular/core';
import { CNAMEService } from '@services';

@Component({
	selector: 'NAME',
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss']
})

export class CNAMEComponent{
	public config = {
		doc: 'name description',
		create: this.SERVICE.create.bind(this.SERVICE),
		update: this.SERVICE.update.bind(this.SERVICE),
		delete: this.SERVICE.delete.bind(this.SERVICE),
		num: true
	};
	constructor(public SERVICE: CNAMEService) {}
}
