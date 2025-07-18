import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/libs/translate/translate.pipe';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { NAMEForm } from '../../formcomponents/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe, CommonModule],
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

	readonly value = input<SelectValue>('');

	readonly wChange = output<SelectValue>();

	constructor(
		_NAMEService: CNAMEService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(NAMEForm, _form, _translate, _NAMEService, 'NAME');

		this.setDocuments();
	}
}
