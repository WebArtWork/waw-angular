import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { UserPreviewComponent } from 'src/app/modules/user/components/user-preview/user-preview.component';
import { HeroComponent } from 'src/app/page-components/hero/hero.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './PNAME.component.html',
	styleUrls: ['./PNAME.component.scss'],
	imports: [UserPreviewComponent, BurgerComponent, HeroComponent],
})
export class PCNAMEComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

	isMenuOpen = signal(false);

	ngOnInit() {
		this._cdr.detectChanges();
	}
}
