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
  
  public searchText = "";
  public pageNumber:number = 0;
  public currentPageSize:number = 0;
  public totalCount:number = 0;
  public pageSize:number = 0;
  public isSearch:boolean = false;
  public isPreDisable:boolean = true;
  public isNextDisable:boolean = true;
  constructor(private userService:User,private authService : Auth,private cd : ChangeDetectorRef,private toastr: ToastrService){}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user=> {
      this.User = user;
    });
    this.userService.allUser$.subscribe(data => this.users = data);
    this.userService.pageNumber.subscribe(number=>{this.pageNumber = number ; this.updateBtnStatus()});
    this.userService.currentPageSize.subscribe(number=>{this.currentPageSize = number; this.updateBtnStatus()});
    this.userService.totalCount.subscribe(number=>this.totalCount = number);
    this.userService.pageSize.subscribe(number=>{this.pageSize = number; this.updateBtnStatus()});
    this.getUserByPage(4);
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
          this.getUserByPage(4);
        },
      })
    }
  }

  search(state:number) {
    this.isSearch = true;
    this.userService.search(this.searchText,state).subscribe({
      next : (data)=> {   
        this.cd.detectChanges();
      }
    });
  }

  reset() {
    this.searchText = "";
    this.isSearch = false;
    this.getUserByPage(3);
  }

  getUserByPage(state:number) {
    if(this.isSearch){ 
      this.search(state);
      return
    };
    this.userService.getUserByPage(state).subscribe({
      next : (data) => {
        this.cd.detectChanges();
        console.log(this.users);
      }
    });
  }

  updateBtnStatus() {
    this.isPreDisable = this.pageNumber === 1;
    this.isNextDisable = this.pageNumber*this.pageSize >= this.totalCount;
  }
}
