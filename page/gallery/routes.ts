import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./NAME.component').then((m) => m.CNAMEComponent),
	},
];
