import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { User } from 'src/app/ViewModels/user-view-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  User={} as User
  constructor(private APIUserServise:APIUsersService,
    private router: Router) { 
      if(environment.UserID !== ""){
        console.log(environment.UserID)
        APIUserServise.getUser(environment.UserID).subscribe(user=>{
          this.User=user;
          console.log(user)
        })
      }
    }
  ngOnInit(): void {
  }
  Check(){
    this.APIUserServise.update(environment.UserID,this.User).subscribe(user=>{
      console.log(user);
      this.router.navigate(['/User/UserProfile'])
    })
  }
}
