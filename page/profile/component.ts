import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { product } from './NAME.const';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [FooterComponent],
})
export class CNAMEComponent {
	readonly product = product;
}
