import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
} from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { images } from './NAME.const';
import { CNAMEImage } from './NAME.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [ButtonComponent, NgClass],
})
export class CNAMEComponent {
	readonly images = signal<CNAMEImage[]>(images);

	readonly activeId = signal<string>(this.images()[0]?.id ?? '');

	readonly activeIndex = computed(() => {
		const list = this.images();
		const idx = list.findIndex((x) => x.id === this.activeId());
		return idx >= 0 ? idx : 0;
	});

	readonly activeImage = computed(() => {
		const list = this.images();
		return list[this.activeIndex()] ?? list[0];
	});

	setActive(id: string): void {
		this.activeId.set(id);
	}
}
