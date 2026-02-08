import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { ListItemComponent } from './NAME-item/NAME-item.component';
import { items } from './NAME.const';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [FooterComponent, ListItemComponent],
})
export class ListComponent {
	readonly items = items;
}
