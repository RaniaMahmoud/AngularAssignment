import { Component, OnInit } from '@angular/core';
import { Store } from 'ViewModels/Store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  store: Store;
  constructor() { 
    this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
  }

  ngOnInit(): void {
  }

}
