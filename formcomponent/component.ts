import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { FormService } from '@lib/form/form.service';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './FILENAME.component.html',
})
export class CNAMEComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('CNAME', this.templateRef);
	}
}
