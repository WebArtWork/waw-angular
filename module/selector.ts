import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { FormInterface, FormService } from '@lib/form';
import { SelectComponent, SelectValue } from '@lib/select';
import { TranslatePipe } from '@lib/translate';
import { CrudComponent } from 'wacom';
import { NAMEForm } from '../../forms/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	selector: 'NAME-selector',
	templateUrl: './NAME-selector.component.html',
})
export class CNAMESelectorComponent extends CrudComponent<
	CNAMEService,
	CNAME,
	FormInterface
> {
	readonly searchable = input<boolean>(true);

	readonly clearable = input<boolean>(true);

	readonly disabled = input<boolean>(false);

	readonly wModel = input<SelectValue>('');

	readonly wChange = output<SelectValue>();

	constructor(_NAMEService: CNAMEService, _form: FormService) {
		super(NAMEForm, _form, _NAMEService, 'NAME');

		this.setDocuments();
	}
}
