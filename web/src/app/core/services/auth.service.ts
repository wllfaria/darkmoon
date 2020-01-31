import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<any>;
	private currentUser: Observable<any>;
	private API_URL = environment.api;
	private httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" })
	};

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("DARKMOONUSER")));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get loggedUser(): any {
		const user = JSON.parse(localStorage.getItem("DARKMOONUSER"));
		if (user) {
			return this.currentUserSubject.next(user);
		}
		return this.currentUserSubject.value;
	}

	public setLoggedUser = (token): void => {
		localStorage.setItem('DARKMOONUSER', JSON.stringify({ token }));
	}

	public login = (email: string, password: string): Observable<any> => {
		return this.http.post<any>(`${this.API_URL}/people/login`, { email, password }, this.httpOptions);
	}
}
