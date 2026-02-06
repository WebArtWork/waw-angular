import { pattern, required, schema } from '@angular/forms/signals';
import { CheckoutModel } from './NAME.interface';

export const checkoutSchema = schema<CheckoutModel>((path) => {
	required(path.fullName, { message: 'Enter your full name...' });

	required(path.phone, { message: 'Enter your phone...' });

	// Email optional: only validate if provided
	pattern(path.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
		message: 'Enter a valid email...',
	});

	required(path.addressLine, { message: 'Enter your address...' });
	required(path.city, { message: 'Enter your city...' });
	required(path.zip, { message: 'Enter your ZIP / postal code...' });
	required(path.country, { message: 'Enter your country...' });
});
