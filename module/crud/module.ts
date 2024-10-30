import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { PCNAMEComponent } from './PNAME.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PCNAMEComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [PCNAMEComponent],
	providers: []
})
export class CNAMEModule {}
