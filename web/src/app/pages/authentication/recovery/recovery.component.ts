import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import { RegexService } from 'src/app/core/services/regex.service';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { selectRecoveryForm } from 'src/app/core/store/selectors/form.selector';
import { IPerson } from 'src/app/models/person.model';
import { selectLoggedPerson } from 'src/app/core/store/selectors/person.selector';
import { UpdateRecoveryForm, EFormActions } from 'src/app/core/store/actions/form.action';
import { IRecoveryRequest } from 'src/app/models/serverRequests/recoveryRequest.model';
import { RecoveryAccount, EPersonActions, RecoveryAccountSuccess } from 'src/app/core/store/actions/person.action';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
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
		console.log('identifier', personIdentifier);
		this.resetPassword = true;
		this.personIdentifier = personIdentifier;
	}

	private setupPage = (): void => {
		this.pinReceived = false;
		this.resetPassword = false;
	}

}
