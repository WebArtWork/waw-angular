import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import {
	CSERVICE,
	CSERVICEService,
	SERVICEFormComponents,
} from 'src/app/core/services/SERVICE.service';
import { CrudComponent } from 'wacom';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, TableModule],
	templateUrl: './NAME.component.html',
	styleUrls: ['./NAME.component.scss'],
})
export class CNAMEComponent extends CrudComponent<
	CSERVICEService,
	CSERVICE,
	FormInterface
> {
	columns = ['name', 'description'];

	config = this.getConfig();

	constructor(
		_SERVICEService: CSERVICEService,
		_translate: TranslateService,
		_form: FormService
	) {
		super(
			SERVICEFormComponents,
			_form,
			_translate,
			_SERVICEService,
			'CSERVICE'
		);

		this.setDocuments();
	}
}
