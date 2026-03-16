import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../service/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.html',
  styleUrl: './view-user.css',
})
export class ViewUser {
  user : any;
  errorMsg:string = "";
  constructor ( private userService : User,private route : ActivatedRoute,private cd : ChangeDetectorRef ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id:number = Number(params.get('id'));
      this.userService.getUserById(id).subscribe({
        next : (data)=> {
          this.user = data;
          this.cd.detectChanges();
        },
        error : (error) => {
          this.errorMsg = error.error.message;
          this.cd.detectChanges();
        }
      })
    })
  }
}
