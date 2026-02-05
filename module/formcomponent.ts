import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FormInterface, FormService } from '@lib/form';
import { SelectComponent, selectDefaults } from '@lib/select';
import { CrudComponent } from 'wacom';
import { NAMEForm } from '../../forms/NAME.form';
import { CNAME } from '../../interfaces/NAME.interface';
import { CNAMEService } from '../../services/NAME.service';

interface SelectTemplateContext {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent],
	templateUrl: './NAME.formcomponent.html',
})
export class CNAMEFormComponent
	extends CrudComponent<CNAMEService, CNAME, FormInterface>
	implements OnInit
{
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<SelectTemplateContext>>('templateRef');

	readonly selectDefaults = selectDefaults;

	constructor(_NAMEService: CNAMEService, _form: FormService) {
		super(NAMEForm, _form, _NAMEService, 'NAME');

		this.setDocuments();
	}

	ngOnInit(): void {
		this._formService.addTemplateComponent<SelectTemplateContext>(
			'CNAME',
			this.templateRef(),
		);
	}
}
