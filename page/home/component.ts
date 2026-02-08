import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@layout/footer';
import { HeroContent, HeroSectionComponent } from '@pageComponent/hero';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [HeroSectionComponent, FooterComponent],
})
export class CNAMEComponent {
	readonly heroContent: HeroContent = {
		badge: {
			icon: 'auto_awesome',
			text: 'Build • Teach • Reuse • Scale',
		},
		title: 'A modular ecosystem to ship products and grow developers.',
		description:
			'Web Art Work combines a software studio, an education platform, and a reusable framework — all driven by production-grade patterns and a token-based UI system.',
		ctas: [
			{ label: 'Get started', targetId: 'pricing', variant: 'primary' },
			{
				label: 'Explore features',
				targetId: 'features',
				variant: 'ghost',
			},
		],
		meta: {
			icon: 'verified',
			text: 'Token-driven UI • Modern Angular',
		},
		card: {
			title: 'Starter template',
			subtitle: 'Sections + patterns',
			icon: 'grid_view',
			miniCards: [
				{
					icon: 'rocket_launch',
					title: 'Fast delivery',
					desc: 'Reusable UI + architecture',
				},
				{
					icon: 'school',
					title: 'Hands-on learning',
					desc: 'From real production code',
				},
				{
					icon: 'extension',
					title: 'Shared framework',
					desc: 'Promote repeatables to libs',
				},
			],
			note: {
				title: 'Ready in minutes',
				icon: 'bolt',
				desc: 'Standalone components, signals, OnPush, and token-driven theming.',
			},
		},
	};
}
