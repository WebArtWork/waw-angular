import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent as LibSelectComponent } from 'src/app/libs/select/select.component';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.formcomponent.html',
	styleUrl: './NAME.formcomponent.scss',
	imports: [LibSelectComponent, NgClass],
})
export class CNAMEFormcomponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('CNAME', this.templateRef);
	}

	select(data: any): string {
		return data.value?.name || (data.value as unknown as string) || '';
	}
}
