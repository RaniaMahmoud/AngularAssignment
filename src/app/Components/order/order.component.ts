import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DiscountOffers } from 'src/app/Models/discount-offers';
import { ICategory } from 'src/app/Models/icategory';
import { ProductViewModel } from 'ViewModels/ProductViewModel';
import { Store } from 'ViewModels/Store';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  Discount: DiscountOffers;
  store: Store;
  ClientName: String;
  CategoryList: Array<ICategory>;
  IsPurshased :boolean;
  SelectedID:number;
  CreditCard:String;
  NationalID:number;
  ProductViewModel:Array<ProductViewModel>;
  TotalPrice:number = 0;
  @ViewChild(ProductsComponent) elementRef!:ProductsComponent;
  constructor() {
    this.Discount = DiscountOffers['No Discount'];
    this.ClientName = "Khaled";
    this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
    this.IsPurshased = true;
    this.SelectedID=0;
    this.CreditCard="0000000000000000";
    this.NationalID=29909011509345;
    this.ProductViewModel=[]
    this.CategoryList = new Array<ICategory>();
    this.CategoryList.push(
      {
        ID:1,
        Name:"IPhone"
      }
    );
    this.CategoryList.push(
      {
        ID:2,
        Name:"Samsung"
      }
    );

  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }
  selection(event:Event){
    console.log(event.target);
    this.IsPurshased = true;
  }
  
  Remove(ID:number){
    let ProductViewModel:Array<ProductViewModel>=[];
    ProductViewModel=this.ProductViewModel.filter(p=>p.ID!=ID);
    this.ProductViewModel=ProductViewModel
    this.TotalPrice =0;
    this.ProductViewModel.forEach(item=>{
      this.TotalPrice += (item.UserQ*item.Price);
    });
  }
  UpdateUserCart(Produt:ProductViewModel){
    let flag=false;
    this.ProductViewModel.forEach(item=>{
      if(item.ID==Produt.ID){
        console.log("Item.ID = "+item.ID+" PID ="+Produt.ID);
        flag = true;
      }
    })
    console.log("Find "+flag);
    if(!flag){
      this.ProductViewModel.push(Produt);
      this.TotalPrice+=Produt.Price*Produt.UserQ;
      //this.OnQuantityChange(Produt.UserQ,Produt.Price);
      console.log("Product "+this.ProductViewModel[0].Name)
    }else{
      alert("This Item In Your Cart");
    }
    // else{
    //   this.ProductViewModel.some(item=>{
    //     if(item.ID==Produt.ID){
    //       item.UserQ+=Produt.UserQ;
    //       this.OnQuantityChange(Produt.UserQ,Produt.Price);
    //     }
    //   }
    //   );
    // }
  }
  Done(){
    this.ProductViewModel.forEach(item=>{
      console.log("Out item.Quantity "+item.Quantity+" item.UserQ "+item.UserQ+"  ID "+item.ID);  
    })
    this.ProductViewModel.find(item=>{
      this.elementRef.ProductListNew.forEach(pro=>{
        console.log("Out item.Quantity "+item.Quantity+" item.UserQ "+item.UserQ+ " pro.ID "+pro.ID+ " pro.Quantity "+pro.Quantity+"  ID "+item.ID);
        if(pro.ID==item.ID){
          pro.Quantity-=item.UserQ;
          console.log("IN item.Quantity "+item.Quantity+" item.UserQ "+item.UserQ+ " pro.ID "+pro.ID+ " pro.Quantity "+pro.Quantity+"  ID "+item.ID);
        }
      })
    })
    this.ProductViewModel=[];
    this.TotalPrice=0;
  }
  OnQuantityChange(ID:number){
    //this.TotalPrice = (quantity * Price);
    this.ProductViewModel.forEach(item=>{
      if(item.ID==ID){
        this.TotalPrice += (item.UserQ*item.Price);
      }
    });
  }
}
