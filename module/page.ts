import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudComponent } from '@wawjs/ngx-crud';
import { FormInterface, FormService } from '@wawjs/ngx-form';
import { TableComponent } from '@wawjs/ngx-ui';
import { NAMEForm } from '../../forms/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
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
