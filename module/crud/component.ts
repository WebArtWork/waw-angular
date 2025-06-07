import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CNAMEService } from '../../services/NAME.service';
import { CNAME } from '../../interfaces/NAME.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { NAMEFormComponents } from '../../formcomponents/NAME.formcomponents';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { CrudComponent } from 'wacom';

@Component({
	imports: [CommonModule, TableModule],
	templateUrl: './PNAME.component.html',
	styleUrls: ['./PNAME.component.scss'],
})
export class PCNAMEComponent extends CrudComponent<
	CNAMEService,
	CNAME,
	FormInterface
> {
	override configType: 'local' | 'server' = 'local';

	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(
		_NAMEService: CNAMEService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(NAMEFormComponents, _form, _translate, _NAMEService);

		this.setDocuments();
	}
}
