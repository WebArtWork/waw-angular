export interface ProductCNAME {
	id: string;
	name: string;
	category: string;
	price: number;
	image: string;

	description: string;
	features?: string[];

	version: string;
	updated: string; // ISO-like string for now
	license: string;

	docsUrl: string;
}
