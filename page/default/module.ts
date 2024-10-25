import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CNAMEComponent } from './FILENAME.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: CNAMEComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CNAMEComponent]
})
export class CNAMEModule {}
