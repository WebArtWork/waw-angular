import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'NAME-icon',
	templateUrl: './FILENAME.component.html',
	styleUrls: ['./FILENAME.component.scss'],
})
export class CNAMEComponent {
	@Input() color = 'black';
}
