import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { User } from 'src/app/ViewModels/user-view-model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  User={} as User
  constructor(private APIUserServise:APIUsersService,
    private router: Router,
    private location:Location) { 

    }

  ngOnInit(): void {
    this.APIUserServise.getUser(environment.UserID).subscribe(user=>{
      console.log(user);
      this.User=user;
    })
  }
  GoBackToPage(){
    this.location.back();
  }
}
