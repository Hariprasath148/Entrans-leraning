import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.html',
  styleUrl: './list-user.css',
})
export class ListUser {

  users:any[] = [];
  public User:any;

  constructor(private userService:User,private authService : Auth,private cd : ChangeDetectorRef){}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getAllUsers().subscribe({
      next : (data)=> {
        this.users = data;
        this.cd.detectChanges();
      },
      error : (error)=> {
        console.log(error);
      }
    });
  }

  deletedUserByID(id:number) {
    this.userService.deleteUserById(id).subscribe({
      next : (data) => {
        this.getUserDetails();
      },
    })
  }
}
