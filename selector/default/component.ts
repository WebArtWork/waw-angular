import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'NAME-selector',
	templateUrl: './NAME-selector.component.html',
	styleUrls: ['./NAME-selector.component.scss'],
})
export class CNAMESelectorComponent implements OnChanges {
	@Input() items = ['Yes', 'No']; // put proper items here

	@Input() value: string;

	@Output() wChange = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
