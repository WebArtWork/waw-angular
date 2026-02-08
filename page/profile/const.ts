import { ProductCNAME } from './NAME.interface';

export const product: ProductCNAME = {
	id: 'starter-template',
	name: 'Starter Template',
	category: 'Product',
	price: 19,
	image: '/assets/default.png',
	description:
		'A clean starter you can extend into real products: token-driven UI, modern Angular patterns, and reusable modules.',
	features: [
		'Token-driven theming (light/dark)',
		'Standalone components + signals',
		'Reusable page sections',
		'Modular backend-ready structure',
	],
	version: '1.0.0',
	updated: '2026-02-06',
	license: 'MIT',
	docsUrl: '/content',
};
