import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser {
  user : any;
  public isError : boolean = false;
  public errorMsg : string = "";
  constructor ( private userService : User,private route : ActivatedRoute,private cd : ChangeDetectorRef , private router : Router,private authService : Auth,private toastr: ToastrService){}
  public User:any;
  
  ngOnInit() {
    let id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
    this.userService.getUserById(id).subscribe({
      next : (data)=> {
        this.user = data;
        this.cd.detectChanges();
      },
      error : (error) => {
        this.errorMsg = error.error.message;
        this.cd.detectChanges();
      }
    });
  }

  updateUser(updateUserForm : NgForm) {
    if(updateUserForm.invalid) return;

    this.userService.updateUser(this.user).subscribe({
      next : (data)=> {
        this.toastr.success('Details Updated');
        this.user = data;
        this.isError = false;
        this.router.navigate(['/dashboard/viewUser',this.user.id])
      },
      error : (error) => {
        this.errorMsg = error.error.message;
        this.isError = true;
        this.cd.detectChanges();
      }
    });
    if(this.user.id == this.User.id && this.User.role === 'Admin' && this.user.role == 'User') this.authService.setUser(this.user);
  }
}
