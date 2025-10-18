import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './FILENAME.component.html',
	styleUrls: ['./FILENAME.component.scss'],
})
export class CNAMEComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('CNAME', this.templateRef);
	}
}
