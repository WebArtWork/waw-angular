import { NgModule } from '@angular/core';
import { CommonModule } from '@common';
import { CNAMEComponent } from './NAME.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CNAMEComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule
	],
	declarations: [
		CNAMEComponent
	],
	providers: []
	
})

export class CNAMEModule { }
