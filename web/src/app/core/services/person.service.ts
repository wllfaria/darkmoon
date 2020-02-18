import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { ILoginRequest } from 'src/app/models/serverRequests/loginRequest.model';
import { IRegisterRequest } from 'src/app/models/serverRequests/registerRequest.model';

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

	public login = (loginData: ILoginRequest): Observable<any> => {
		return this.http.post<any>(`${this.API_URL}/people/login`, { email: loginData.email, password: loginData.password }, this.httpOptions);
	}

	public register = (registerData: IRegisterRequest): Observable<any> => {
		return this.http.post<any>(
			`${this.API_URL}/people`,
			{
				name: registerData.name,
				email: registerData.email,
				cpf: registerData.cpf,
				password: registerData.password,
				confirmation: registerData.confirmation
			},
			this.httpOptions
		);
	}
}
