import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private API_URL: string = environment.api

	constructor(private http: HttpClient) { }

	public getById = (id: number): Observable<any> => {
		return this.http.get(`${this.API_URL}/people/${id}`);
	}
}
