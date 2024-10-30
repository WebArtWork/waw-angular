import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CNAMEService } from '../../services/NAME.service';
import { CNAME } from '../../interfaces/NAME.interface';

@Component({
	selector: 'user-selector',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
	standalone: true,
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() onChange = new EventEmitter();

	get items(): CNAME[] {
		return _NAMEService.NAMEs;
	}

	constructor(private _NAMEService: CNAMEService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
