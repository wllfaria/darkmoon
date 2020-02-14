import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import SenderRegisterInterface from 'src/app/models/senders/senderRegister.model';
import SenderLoginInterface from 'src/app/models/senders/senderLogin.model';
import * as jwt_decode from "jwt-decode";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private API_URL = environment.api;
	private httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" })
	};

	constructor(private http: HttpClient) {}

	public get getLoggedUser(): any {
		const user = JSON.parse(localStorage.getItem("DARKMOONUSER"));
		if (user) {
			try {
				return jwt_decode(user.token);
			} catch (err) {
				console.log('teste')
				return null;
			}
		}
		return user;
	}

	public setLoggedUser = (token: string): void => {
		localStorage.setItem('DARKMOONUSER', JSON.stringify({ token }));
	}

	public login = (loginData: SenderLoginInterface): Observable<any> => {
		return this.http.post<any>(`${this.API_URL}/people/login`, { email: loginData.email, password: loginData.password }, this.httpOptions);
	}

	public register = (registerData: SenderRegisterInterface): Observable<any> => {
		return this.http.post<any>(
			`${this.API_URL}/people`, 
			{ name: registerData.name, email: registerData.email, cpf: registerData.cpf, password: registerData.password, confirmation: registerData.confirmation }, 
			this.httpOptions
		);
	}
}
