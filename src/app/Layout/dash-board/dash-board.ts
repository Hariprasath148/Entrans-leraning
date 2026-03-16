import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.html',
  styleUrls: ['./dash-board.css'],
})
export class DashBoard {

  public User:any;

  constructor(private userService : User , private authService : Auth , private router: Router,private cd : ChangeDetectorRef,private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
  }

  logout() {
  this.userService.logout().subscribe(() => {
    localStorage.clear();
    this.toastr.success('Logout Successfully');
    this.router.navigate(['/']);
  });
}
} 
