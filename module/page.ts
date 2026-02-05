import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { CrudComponent } from 'wacom';
import { NAMEForm } from '../../forms/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMESelectorComponent } from '../../selectors/NAME/NAME-selector.component';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, CNAMESelectorComponent],
	templateUrl: './NAMEs.component.html',
})
export class CNAMEsComponent extends CrudComponent<
	CNAMEService,
	CNAME,
	FormInterface
> {
	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(_NAMEService: CNAMEService, _form: FormService) {
		super(NAMEForm, _form, _NAMEService, 'NAME');

		this.setDocuments();
	}
}
