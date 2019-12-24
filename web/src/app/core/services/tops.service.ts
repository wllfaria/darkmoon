import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TopsService {
  constructor(private http: HttpClient) {}

  private API_URL: string = environment.api;

  getAll(): Observable<any> {
    return this.http.get(`${this.API_URL}/tops`);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.API_URL}/tops/images/all`);
  }

  getByUrl(url: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tops/url/${url}`);
  }

  getImagesByTopId(id: number): Observable<any> {
    console.log("entered4");
    return this.http.get(`${this.API_URL}/tops/images/${id}`);
  }
}
