export interface IRecoveryPasswordRequest {
	pin: number;
	password: string;
	confirmation: string;
	email?: string;
	id: number;
}
