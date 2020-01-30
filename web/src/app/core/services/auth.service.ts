import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("DARKMOONUSER"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get loggedUser(): any {
    const user = JSON.parse(localStorage.getItem("DARKMOONUSER"));
    if (user) {
      return this.currentUserSubject.next(user);
    }
    return this.currentUserSubject.value;
  }
}
