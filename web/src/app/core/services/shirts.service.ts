import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ShirtsService {
	constructor(private http: HttpClient) {}

	private API_URL: string = environment.api;

	getAll(): Observable<any> {
		return this.http.get<any>(`${this.API_URL}/shirts`);
	}

	getDistinct(): Observable<any> {
		return this.http.get<any>(`${this.API_URL}/shirts/distinct`);
	}
}
