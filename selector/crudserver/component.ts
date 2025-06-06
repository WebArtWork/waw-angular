import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { CNAMEService, CNAME } from 'src/app/core/services/NAME.service';

@Component({
	selector: 'NAME-selector',
	templateUrl: './NAME-selector.component.html',
	styleUrls: ['./NAME-selector.component.scss'],
})
export class CNAMESelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): CNAME[] {
		return this._NAMEService.NAMEs;
	}

	constructor(private _NAMEService: CNAMEService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
