import { DecimalPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { FooterComponent } from '@layout/footer';
import { AlertService } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { InputComponent } from '@lib/input';
import { CartItem, CheckoutModel } from './NAME.interface';
import { checkoutSchema } from './NAME.schema';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './NAME.component.html',
	imports: [InputComponent, ButtonComponent, FooterComponent, DecimalPipe],
})
export class CNAMEComponent {
	private readonly _alert = inject(AlertService);

	// Demo cart (replace later with real cart service)
	readonly items = signal<CartItem[]>([
		{ id: '1', title: 'Starter Template', price: 0, qty: 1 },
		{ id: '2', title: 'Pro Plan (Monthly)', price: 19, qty: 1 },
	]);

	// Checkout form
	readonly model = signal<CheckoutModel>({
		fullName: '',
		phone: '',
		email: '',
		addressLine: '',
		city: '',
		zip: '',
		country: '',
		notes: '',
	});

	readonly checkoutForm = form(this.model, checkoutSchema);
	readonly isSubmitDisabled = computed(() => this.checkoutForm().invalid());

	// Totals
	readonly subtotal = computed(() =>
		this.items().reduce((sum, i) => sum + i.price * i.qty, 0),
	);

	readonly deliveryFee = computed(() => (this.subtotal() > 0 ? 5 : 0));
	readonly total = computed(() => this.subtotal() + this.deliveryFee());

	itemTotal(item: CartItem): number {
		return item.price * item.qty;
	}

	clearCart(): void {
		this.items.set([]);
	}

	fillDemo(): void {
		this.model.set({
			fullName: 'Alex Johnson',
			phone: '+1 555 010 0200',
			email: 'alex@example.com',
			addressLine: '21 Market Street, Apt 5',
			city: 'San Francisco',
			zip: '94105',
			country: 'USA',
			notes: 'Leave at reception if not available.',
		});
		this.checkoutForm().reset();
	}

	onSubmit(): void {
		submit(this.checkoutForm, (tree) => {
			const payload = tree().value() as CheckoutModel;

			// TODO: call your backend service to create order / save info
			// For now, just show success and reset.
			this._alert.success({
				title: 'Order ready',
				text: `Thanks, ${payload.fullName}. We received your details.`,
				position: 'topRight',
			});

			return Promise.resolve();
		});
	}
}
