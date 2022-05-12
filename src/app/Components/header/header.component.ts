import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  LogedIn:boolean;
  Count: number;
  
  constructor(private router: Router,
    private dataService: DataService) { 
    this.LogedIn = environment.ISLogin;
    this.Count = parseInt(localStorage.getItem('CardItems')!);
    //this.getData();
  }

  ngOnInit(): void {
    //this.Count=parseInt(localStorage.getItem('CardItems')!);
    //this.dataService.setProduct();
    this.dataService.selectedProduct$.subscribe(value=>{
      this.Count = value;
    });
  }

  LogOut(){
    environment.ISLogin=false;
    console.log(environment.ISLogin)
    this.LogedIn=environment.ISLogin;
    console.log(this.LogedIn)
    localStorage.removeItem("Token");
    this.router.navigate(['/Home']);
  }

  getData() {
    //this.getData();
  }
}
