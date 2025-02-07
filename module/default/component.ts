import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	templateUrl: './FILENAME.component.html',
	styleUrls: ['./FILENAME.component.scss'],
	standalone: false,
})
export class CNAMEComponent {
	isMenuOpen = false;

	constructor(public userService: UserService) {}

	back(): void {
		window.history.back();
	}
}
