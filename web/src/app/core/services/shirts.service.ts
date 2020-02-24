import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ISku } from 'src/app/models/sku.model';

@Injectable({
	providedIn: 'root'
})
export class ShirtsService {
	constructor(
		private http: HttpClient
	) { }

	private API_URL: string = environment.api;

	public getAll = (): Observable<any> => {
		return this.http.get<any>(`${this.API_URL}/shirts`);
	}

	public getDistinct = (): Observable<HttpResponse<ISku>> => {
		return this.http.get<HttpResponse<ISku>>(`${this.API_URL}/shirts/distinct`);
	}

	public getByUrl = (productUrl: string): Observable<any> => {
        console.log(productUrl);
		return this.http.get<HttpResponse<ISku>>(`${this.API_URL}/shirts/${productUrl}`);
	}
}
