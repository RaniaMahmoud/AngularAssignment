import { Component, OnInit } from '@angular/core';
import { Store } from 'ViewModels/Store';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent implements OnInit {
  store: Store;
  constructor() {
    this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
   }

  ngOnInit(): void {
  }

}
