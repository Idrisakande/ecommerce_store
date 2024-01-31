export interface ILoginFormInput {
	email: string;
	password: string;
}

export interface ISignupFormInput extends ILoginFormInput {
	firstname: string;
	lastname: string;
	phone_number: string;
	confirm_password: string;
	country: string;
}
