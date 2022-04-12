import { Component, OnInit } from '@angular/core';
import { DiscountOffers } from '../discount-offers';
import { IProduct } from '../iproduct';
import { Store } from 'ViewModels/Store';
import { ICategory } from '../icategory';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  Discount: DiscountOffers;
  store: Store;
  ClientName: String;
  ProductList: Array<IProduct>;
  CategoryList: Array<ICategory>;
  ProductListNew :Array<IProduct>;
  IsPurshased :boolean;
  constructor() {
    this.Discount = DiscountOffers['No Discount'];
    this.ClientName = "Khaled";
    this.store = new Store("New Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
    this.ProductListNew = new Array<IProduct>();
    this.IsPurshased = true;
    this.ProductList = new Array<IProduct>();
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 1,
        Img: "a",
        Name: "ProductOne",
        Price: 120,
        Quantity: 10
      }
    );
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 2,
        Img: "b",
        Name: "ProductTwo",
        Price: 100,
        Quantity: 5
      }
    );
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 3,
        Img: "c",
        Name: "ProductThree",
        Price: 150,
        Quantity: 20
      }
    );
    this.ProductList.push(
      {
        CateogryID: 2,
        ID: 4,
        Img: "b",
        Name: "ProductFour",
        Price: 100,
        Quantity: 5
      }
    );
    this.ProductList.push(
      {
        CateogryID: 2,
        ID: 4,
        Img: "c",
        Name: "ProductFive",
        Price: 150,
        Quantity: 20
      }
    );

    this.CategoryList = new Array<ICategory>();
    this.CategoryList.push(
      {
        ID:1,
        Name:"CategoryOne"
      }
    );
    this.CategoryList.push(
      {
        ID:2,
        Name:"CategoryTwo"
      }
    );
  }

  ngOnInit(): void {
  }
  Display(id:number){
    //const li=event?.target;
    console.log(id);
    this.IsPurshased = true;
    this.ProductListNew = this.ProductList.filter((p=>p.CateogryID==id));
  }
  Buy(){
    this.IsPurshased = !this.IsPurshased;
  }
}
