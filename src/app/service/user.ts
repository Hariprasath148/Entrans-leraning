import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = "http://localhost:5058/user";

  private allUserSubject = new BehaviorSubject<any[]>([]);
  public  allUser$ = this.allUserSubject.asObservable();
  
  constructor(private http: HttpClient,private autUser:Auth) {}

  addUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addUser`,user).pipe(
      tap(user =>{
        const users = this.allUserSubject.value;
        this.allUserSubject.next([...users, user]);
      })
    );
  }

  logIn(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/logIn`,user);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`,{});
  }

  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllUser`).pipe(
      tap(users=> {this.allUserSubject.next(users)})
    );
  }

  getUserById(id:number):Observable<any> {
    if(id == this.autUser.getUser().id) return of(structuredClone(this.autUser.getUser()));

    const checkUser = this.allUserSubject.value.filter(user => user.id == id);

    if(checkUser.length != 0) return of(checkUser[0]);

    return this.http.get<any>(`${this.baseUrl}/getUserById/${id}`);
  }

  updateUser(updateUser:any):Observable<any> {
    if(updateUser.id == this.autUser.getUser().id) this.autUser.setUser(updateUser);
    return this.http.put<any>(`${this.baseUrl}/updateUser/${updateUser.id}`,updateUser);
  }

  deleteUserById(id:number):Observable<any> {
    this.allUserSubject.next(this.allUserSubject.value.filter(user => user.id != id));
    return this.http.delete<any>(`${this.baseUrl}/deleteUserById/${id}`);
  }

  search(email:string):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/${email}`).pipe(
      tap(users => this.allUserSubject.next(users))
    )
  }
}
