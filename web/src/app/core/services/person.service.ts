import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { ILoginRequest } from 'src/app/models/serverRequests/loginRequest.model';
import { IRegisterRequest } from 'src/app/models/serverRequests/registerRequest.model';
import { IRegisterResponse } from 'src/app/models/serverResponses/registerResponse.model';
import { ILoginResponse } from 'src/app/models/serverResponses/loginResponse.model';
import { IRecoveryRequest } from 'src/app/models/serverRequests/recoveryRequest.model';
import { IRecoveryPinRequest } from 'src/app/models/serverRequests/recoveryPinRequest.model';
import { IRecoveryPinResponse } from 'src/app/models/serverResponses/recoveryPinResponse.model';
import { IRecoveryPasswordRequest } from 'src/app/models/serverRequests/recoveryPasswordRequest.model';
import { IRecoveryPasswordResponse } from 'src/app/models/serverResponses/recoveryPasswordResponse.model';

@Injectable({
	providedIn: 'root'
})
export class PersonService {

	constructor(
		private http: HttpClient
	) { }

	private API_URL = environment.api;
	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};


	public get getLoggedUser(): any {
		const user = JSON.parse(localStorage.getItem('DARKMOONUSER'));
		if (user) {
			try {
				return jwt_decode(user.token);
			} catch (err) {
				return null;
			}
		}
		return user;
	}

	public setLoggedUser = (token: string): void => {
		localStorage.setItem('DARKMOONUSER', JSON.stringify({ token }));
	}

	public login = (loginData: ILoginRequest): Observable<HttpResponse<ILoginResponse>> => {
		return this.http.post<HttpResponse<ILoginResponse>>(`${this.API_URL}/people/login`, loginData, this.httpOptions);
	}

	public register = (personData: IRegisterRequest): Observable<HttpResponse<IRegisterResponse>> => {
		return this.http.post<HttpResponse<IRegisterResponse>>(`${this.API_URL}/people`, personData, this.httpOptions);
	}

	public recoveryAccount = (personEmail: IRecoveryRequest): Observable<HttpResponse<any>> => {
		return this.http.post<HttpResponse<any>>(`${this.API_URL}/people/recovery`, personEmail, this.httpOptions);
	}

	public confirmRecoveryPin = (pinConfirmation: IRecoveryPinRequest): Observable<HttpResponse<IRecoveryPinResponse>> => {
		return this.http.post<HttpResponse<IRecoveryPinResponse>>(
			`${this.API_URL}/people/recovery/pin`,
			pinConfirmation,
			this.httpOptions
		);
	}

	public recoveryPassword = (recoveryPasswordData: IRecoveryPasswordRequest): Observable<HttpResponse<IRecoveryPasswordResponse>> => {
		return this.http.put<HttpResponse<IRecoveryPasswordResponse>>(
			`${this.API_URL}/people/recovery`,
			recoveryPasswordData,
			this.httpOptions
		);
	}
}
