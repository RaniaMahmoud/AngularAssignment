import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { User } from 'src/app/ViewModels/user-view-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  // id: number,
  // Name: string,
  // Email: string,
  // Phone: string,
  // City: string,
  // Postal: string,
  // Code: string,
  // street: string,
  // password:string
  User = {} as User;
  constructor(private APIUserServise:APIUsersService,private router: Router) {
  }

  ngOnInit(): void {
  }
  AddUser(){
    this.APIUserServise.addUser(this.User).subscribe(user=>{
      console.log("Done Save User");
      this.router.navigate(['/'])

    })
  }
  Submit(){
    this.AddUser();
  }

}
