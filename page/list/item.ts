import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Item } from '../NAME.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-NAME-item',
	templateUrl: './NAME-item.component.html',
})
export class CNAMEItemComponent {
	readonly item = input.required<Item>();
}
