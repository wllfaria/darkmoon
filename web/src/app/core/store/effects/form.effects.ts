import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { UpdateRegisterForm, EFormActions, UpdateRegisterFormSuccess, UpdateRegisterFormFailed } from '../actions/form.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormEffect {
	constructor(
		private actions$: Actions,
		private store: Store<IAppState>
	) { }
}
