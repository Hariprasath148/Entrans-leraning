import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {

  public isError : boolean = false;
  public errorMsg : string = "";

  constructor(private userService : User , private cd : ChangeDetectorRef,private toastr: ToastrService) {}

  addNewUser(addNewUserForm:NgForm) {
    console.log(addNewUserForm.value)
    if(addNewUserForm.invalid ) return;

    this.userService.addUser(addNewUserForm.value).subscribe({
      next : (data) => {
        console.log(data);
        this.toastr.success('User Added');
        addNewUserForm.resetForm();
        this.isError = false;
        this.cd.detectChanges();
      },
      error : (error) => {
        console.log(error);
        this.isError = true;
        this.errorMsg = error.error.message;
        this.cd.detectChanges();
      }
    })


  }
}
