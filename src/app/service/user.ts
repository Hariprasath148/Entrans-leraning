import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = "http://localhost:5058/user";

  private allUserSubject = new BehaviorSubject<any[]>([]);
  public  allUser$ = this.allUserSubject.asObservable();
  
  constructor(private http: HttpClient) {}

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

    if(this.allUserSubject.value.length != 0) {return of([false])};

    return this.http.get<any[]>(`${this.baseUrl}/getAllUser`).pipe(
      tap(users=> {this.allUserSubject.next(users)})
    );
  }

  getUserById(id:number):Observable<any> {

    const checkUser = this.allUserSubject.value.filter(user => user.id == id);

    if(checkUser.length != 0) return of(checkUser[0]);

    return this.http.get<any>(`${this.baseUrl}/getUserById/${id}`);
  }

  updateUser(updateUser:any):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateUser/${updateUser.id}`,updateUser);
  }

  deleteUserById(id:number):Observable<any> {
    this.allUserSubject.next(this.allUserSubject.value.filter(user => user.id != id));
    return this.http.delete<any>(`${this.baseUrl}/deleteUserById/${id}`);
  }

}
