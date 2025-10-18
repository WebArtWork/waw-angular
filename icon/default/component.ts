import { Component, Input } from '@angular/core';

@Component({
	selector: 'NAME-icon',
	templateUrl: './FILENAME.component.html',
	styleUrls: ['./FILENAME.component.scss'],
	standalone: false,
})
export class CNAMEComponent {
	@Input() color = 'black';
}
