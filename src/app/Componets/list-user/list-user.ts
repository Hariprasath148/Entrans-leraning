import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.html',
  styleUrl: './list-user.css',
})
export class ListUser {

  users:any[] = [];
  public User:any;

  constructor(private userService:User,private authService : Auth,private cd : ChangeDetectorRef,private toastr: ToastrService){}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
    this.userService.allUser$.subscribe(data => this.users = data);
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getAllUsers().subscribe({
      next : () => { this.cd.detectChanges(); },
      error : (error)=> {console.log(error);}
    });
  }

  deletedUserByID(id:number) {
    if (confirm('Are you sure you want to delete this user?')){
      this.userService.deleteUserById(id).subscribe({
        next : (data) => {
          this.toastr.success('Deleted');
          this.getUserDetails();
        },
      })
    }
  }
}
