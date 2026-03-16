import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = "http://localhost:5058/user";
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  validate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate`,{withCredentials : true});
  }

  setUser(user:any) {
    this.currentUserSubject.next(user);
  }

  getUser() {
    return this.currentUserSubject.value;
  }

}
