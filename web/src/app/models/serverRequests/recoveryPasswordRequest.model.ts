export interface IRecoveryPasswordRequest {
	pin: number;
	password: string;
	confirmation: string;
	id: number;
}
