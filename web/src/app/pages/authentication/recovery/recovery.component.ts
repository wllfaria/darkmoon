import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';

@Component({
	selector: 'app-recovery',
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

	constructor() { }

	// ! General variable definitions
	public pinReceived: boolean;
	public resetPassword: boolean;
	public personEmail: string;
	public personIdentifier: IRecoveryPinResponse;

	ngOnInit() {
		this.setupPage();
	}

	public listenPinReceived = (personEmail: string): void => {
		this.pinReceived = true;
		this.personEmail = personEmail;
	}

	public listenPinConfirmed = (personIdentifier: IRecoveryPinResponse): void => {
		this.resetPassword = true;
		this.personIdentifier = personIdentifier;
	}

	private setupPage = (): void => {
		this.pinReceived = false;
		this.resetPassword = false;
	}

}
