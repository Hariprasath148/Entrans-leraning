import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = "http://localhost:5058/user";

  private allUserSubject = new BehaviorSubject<any[]>([]);
  public  allUser$ = this.allUserSubject.asObservable();

  public pageNumber = new BehaviorSubject<number>(1);
  public currentPageSize = new BehaviorSubject<number>(0);
  public totalCount = new BehaviorSubject<number>(0);
  public pageSize = new BehaviorSubject<number>(10);
  
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

  getUserByPage(state:Number):Observable<any> {
    let pageNumber;
    if(state==3) pageNumber=1;
    else if(state==4) pageNumber=this.pageNumber.value;
    else pageNumber = (state==1) ? this.pageNumber.value+1 : this.pageNumber.value-1;
    this.pageNumber.next(pageNumber);
    return this.http.get<any>(`${this.baseUrl}/getUserByPage?pageNumber=${pageNumber}&pageSize=${this.pageSize.value}`).pipe(
      tap(data => {
        this.allUserSubject.next(data.users);
        this.totalCount.next(data.totalCount);
        this.currentPageSize.next(data.currentCount);
      })
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

  search(searchText:string,state:number):Observable<any> {
    let pageNumber;
    if(state==3) pageNumber=1;
    else if(state==4) pageNumber=this.pageNumber.value;
    else pageNumber = (state==1) ? this.pageNumber.value+1 : this.pageNumber.value-1;
    this.pageNumber.next(pageNumber);
    return this.http.get<any>(`${this.baseUrl}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${this.pageSize.value}`).pipe(
      tap(data => {
        this.allUserSubject.next(data.users);
        this.totalCount.next(data.totalCount);
        this.currentPageSize.next(data.currentCount);
      })
    )
  }
}
