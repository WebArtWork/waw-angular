import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { CNAMEComponent } from './NAME.component';

@NgModule({
	imports: [
		CoreModule
	],
	declarations: [
		CNAMEComponent
	],
	exports: [
		CNAMEComponent
	],
	providers: []

})

export class CNAMEModule { }
