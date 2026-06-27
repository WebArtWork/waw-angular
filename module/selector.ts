import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { CrudComponent } from '@wawjs/ngx-crud';
import { FormInterface, FormService } from '@wawjs/ngx-form';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { SelectComponent, SelectValue } from '@wawjs/ngx-ui';
import { NAMEForm } from '../../forms/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslateDirective],
	selector: 'selector-NAME',
	templateUrl: './NAME.component.html',
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
