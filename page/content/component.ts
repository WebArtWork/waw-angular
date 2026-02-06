import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { MarkedSectionComponent } from '@pageComponent/marked';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [FooterComponent, MarkedSectionComponent],
})
export class CNAMEComponent {
	private readonly _http = inject(HttpClient);

	markdown = signal<string>('');

	constructor() {
		this._http
			.get('/assets/README.md', { responseType: 'text' })
			.subscribe({
				next: (markdown) => this.markdown.set(markdown as string),
			});
	}
}
