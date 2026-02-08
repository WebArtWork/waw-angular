import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { TableComponent as LibTableComponent } from '@lib/table';
import { rows } from './NAME.const';
import { CNAMERow } from './NAME.interface';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [FooterComponent, LibTableComponent],
})
export class CNAMEComponent {
	// wtable expects { title, field } (or strings) — we keep it explicit.
	readonly columns = [
		{ title: 'GPU', field: 'model' },
		{ title: 'Tier', field: 'tier' },
		{ title: 'Best for', field: 'bestFor' },
		{ title: 'Pros', field: 'pros' },
		{ title: 'Cons', field: 'cons' },
	];

	// "Almost empty" config — but valid for the lib defaults.
	readonly config: any = {
		searchable: true,
		searchBy: 'model',
		allDocs: true,
		perPage: 10,
		page: 1,
		pageSizeOptions: [10, 20, 50],
	};

	// Static demo rows (id field aligned with default bindValue = "_id")
	readonly rows: CNAMERow[] = rows;
}
