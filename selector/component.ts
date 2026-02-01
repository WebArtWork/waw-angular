import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'selector-NAME',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME-selector.component.html',
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
