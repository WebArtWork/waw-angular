import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { TranslateService } from 'src/app/libs/translate/translate.service';
import { CrudComponent } from 'wacom';
import { NAMEForm } from '../../formcomponents/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMESelectorComponent } from '../../selectors/NAME/NAME-selector.component';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, CNAMESelectorComponent],
	templateUrl: './PNAME.component.html',
})
export class PCNAMEComponent extends CrudComponent<
	CNAMEService,
	CNAME,
	FormInterface
> {
	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(
		_NAMEService: CNAMEService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(NAMEForm, _form, _translate, _NAMEService, 'NAME');

		this.setDocuments();
	}
}
