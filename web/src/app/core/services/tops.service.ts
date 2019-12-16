import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class TopsService {
  constructor(private http: HttpClient) {}

  private API_URL: string = environment.api;

  getAll() {
    return this.http.get(`${this.API_URL}/tops`);
  }

  getImages() {
    return this.http.get(`${this.API_URL}/tops/images`);
  }
}
