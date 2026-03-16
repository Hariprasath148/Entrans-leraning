import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = "http://localhost:5058/user";

  constructor(private http: HttpClient) {}

  addUser(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addUser`,user);
  }

  logIn(user:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/logIn`,user);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`,{});
  }

  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllUser`);
  }

  getUserById(id:number):Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserById/${id}`);
  }

  updateUser(updateUser:any):Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateUser/${updateUser.id}`,updateUser);
  }

  deleteUserById(id:number):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteUserById/${id}`);
  }

}
