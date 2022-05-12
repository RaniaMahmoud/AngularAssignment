import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { AuthData } from 'src/app/ViewModels/AuthData-view-model';
import { User } from 'src/app/ViewModels/user-view-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User = {} as User;
  Mytoken = {} as AuthData;
  error="";
  ErrorExist:boolean;
  @ViewChild('alert', { static: true }) alert: ElementRef | undefined;
  constructor(private APIUserServise:APIUsersService,
    private router: Router) {
      // console.log(environment.ISLogin)
      // environment.ISLogin=true;
      // console.log(environment.ISLogin)
      this.ErrorExist=false;
  }

  ngOnInit(): void {
  }
  Submit(){
      this.APIUserServise.LogIn({Password:this.User.password,UserName:this.User.Full_Name}).subscribe({
        next:(data)=>{
          console.log(data);
          environment.Token=data.token;
          environment.UserID=data.UserId;
          environment.UserName=data.UserName;
          environment.expiration=data.expiration;
          environment.ISLogin=true;
          this.router.navigate(['/Home']);
        },
        error:(error)=>{
          
          this.error=error.statusText;
          console.log(error);
          console.log(error.statusText);
          this.ErrorExist=true;
          this.router.navigate(['/Login'])
        }
      })
    //   if(isExist){
    //     console.log(isExist)
    //     console.log(environment.ISLogin)
    //     environment.ISLogin=true;
    //     console.log(environment.ISLogin)
        
    //     localStorage.setItem("Token",environment.Token=this.randomString());
    //     this.router.navigate(['/Home'])
    //   }else{
    //     console.log(isExist)
    //     this.router.navigate(['/Login'])
    //   }
    // }) 
  }

  closeAlert() {
    this.ErrorExist=false;
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
