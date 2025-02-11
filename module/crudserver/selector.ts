import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CNAMEService } from '../../services/NAME.service';
import { CNAME } from '../../interfaces/NAME.interface';

@Component({
	selector: 'NAME-selector',
	templateUrl: './NAME-selector.component.html',
	styleUrls: ['./NAME-selector.component.scss'],
	imports: [SelectModule],
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
