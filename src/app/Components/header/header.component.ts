import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LogedIn:boolean;
  constructor(private router: Router) { 
    this.LogedIn=environment.ISLogin;
  }

  ngOnInit(): void {
  }
  LogOut(){
    environment.ISLogin=false;
    console.log(environment.ISLogin)
    this.LogedIn=environment.ISLogin;
    console.log(this.LogedIn)
    localStorage.removeItem("Token");
    this.router.navigate(['/Home']);
  }
}
