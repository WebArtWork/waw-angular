import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { CrudComponent } from 'wacom';
import { NAMEFormComponents } from '../../formcomponents/NAME.formcomponents';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, TableModule],
	templateUrl: './PNAME.component.html',
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
		super(NAMEFormComponents, _form, _translate, _NAMEService, 'CNAME');

		this.setDocuments();
	}
}
