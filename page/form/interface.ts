export interface CheckoutModel {
	fullName: string;
	phone: string;
	email: string; // optional but keep as string
	addressLine: string;
	city: string;
	zip: string;
	country: string;
	notes: string; // optional but keep as string
}

export interface CartItem {
	id: string;
	title: string;
	price: number;
	qty: number;
}
