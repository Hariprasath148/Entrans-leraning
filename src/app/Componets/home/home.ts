import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../service/user';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  invalidCrentials = false;
  invalidCrentialsMsg = "";
  isLogIn = false;
  // loginStatus  = {
  //   invalidCrentials : false,
  //   invalidEmail : false,
  //   isEmail : false,
  //   isPassword : false
  // }
 
  constructor(private router : Router,private userService : User , private cd : ChangeDetectorRef){}

  onSubmit(e : Event , loginForm : NgForm) {

    if(loginForm.invalid) return; 
    this.isLogIn = true;
    this.userService.logIn(loginForm.value).subscribe({
      next : (data)=> {
        this.router.navigate(["/dashboard"]);
      },
      error : (error) => {
        this.invalidCrentials = true;
        this.invalidCrentialsMsg = error.error.message;
        this.isLogIn = false;
        this.cd.detectChanges();
      }
    }
    );

    // if(loginForm.value.email !== "demo@gmail.com" || loginForm.value.password !== "12345")  {
    //   this.invalidCrentials = true;
    //   return;
    // }
    // this.router.navigate(["/dashboard"]);

    // if(loginForm.controls['email'].untouched || loginForm.controls['password'].untouched) {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   return;
    // }
    // if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.value.email)) {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   this.loginStatus.invalidEmail = true;
    //   return;
    // }
    // if(loginForm.value.email !== "demo@gmail.com" || loginForm.value.password !== "12345") {
    //   this.loginStatus.isEmail = loginForm.controls['email'].untouched;
    //   this.loginStatus.isPassword = loginForm.controls['password'].untouched;
    //   this.loginStatus.invalidEmail = false;
    //   this.loginStatus.invalidCrentials = true;
    //   return;
    // }
  }
}
