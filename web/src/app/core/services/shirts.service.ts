import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShirtsService {
	constructor(private http: HttpClient) {}

	private API_URL: string = 'environment.api';

	public getAll = (): Observable<any> => {
		return this.http.get<any>(`${this.API_URL}/shirts`);
	}

	public getDistinct = (): Observable<any> => {
		return this.http.get<any>(`${this.API_URL}/shirts/distinct`);
	}

	public getByUrl = (url: string): Observable<any> => {
		return;
	}
}
