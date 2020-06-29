import { NgModule } from '@angular/core';
import { SharedModule } from '@common';
import { CNAMEComponent } from './NAME.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CNAMEComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
		SharedModule
	],
	declarations: [
		CNAMEComponent
	],
	providers: []
	
})

export class CNAMEModule { }
