import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './FILENAME.component.html',
	styleUrls: ['./FILENAME.component.scss'],
})
export class CNAMEComponent {}
