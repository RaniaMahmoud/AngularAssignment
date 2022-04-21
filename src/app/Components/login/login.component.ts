import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { User } from 'src/app/ViewModels/user-view-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User = {} as User;
  constructor(private APIUserServise:APIUsersService,
    private router: Router) {
      // console.log(environment.ISLogin)
      // environment.ISLogin=true;
      // console.log(environment.ISLogin)
  }

  ngOnInit(): void {
  }
  Submit(){
    this.APIUserServise.getAllUsers().subscribe(users=>{
      let isExist=false;  
      users.forEach(user => {
        if(user.Full_Name==this.User.Full_Name && user.password==this.User.password){
          isExist=true;
          environment.UserID = user.id;
          console.log(environment.UserID)
        }        
      });
      if(isExist){
        console.log(isExist)
        console.log(environment.ISLogin)
        environment.ISLogin=true;
        console.log(environment.ISLogin)
        
        localStorage.setItem("Token",environment.Token=this.randomString());
        this.router.navigate(['/Home'])
      }else{
        console.log(isExist)
        this.router.navigate(['/Login'])
      }
    }) 
  }
  randomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 10; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
