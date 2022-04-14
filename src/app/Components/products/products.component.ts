import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DiscountOffers } from 'src/app/Models/discount-offers';
import { Store } from 'ViewModels/Store';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductViewModel } from 'ViewModels/ProductViewModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnChanges {
  // Discount: DiscountOffers;
  // store: Store;
  // ClientName: String;
  ProductList: Array<IProduct>;
  //CategoryList: Array<ICategory>;
  userQuantity:number=0;
  ProductListNew :Array<IProduct>;
  IsPurshased :boolean;
  @Input() GetSelectedID:number;
  //CreditCard:String;
  //NationalID:number;
  @Output() AddToCart: EventEmitter<ProductViewModel>;
  
  constructor() {
    this.AddToCart= new EventEmitter<ProductViewModel>();
    // this.Discount = DiscountOffers['No Discount'];
    // this.ClientName = "Khaled";
    // this.store = new Store("Assiut Store", ["Assiut", "Minia"], "../../assets/Storelogo.png");
    this.ProductListNew = new Array<IProduct>();
    this.IsPurshased = true;
    this.ProductList = new Array<IProduct>();
    this.GetSelectedID=0;
    // this.CreditCard="0000000000000000";
    // this.NationalID=29909011509345;
    //todayDate: Date = new Date();
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 1,
        Img: "../../assets/productcard.jpg",
        Name: "iPhone 11",
        Price: 120,
        Quantity: 0,
        CreationDate:new Date()
      }
    );
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 2,
        Img: "../../assets/productcard.jpg",
        Name: "iPhone 12",
        Price: 100,
        Quantity: 1,
        CreationDate:new Date()
      }
    );
    this.ProductList.push(
      {
        CateogryID: 1,
        ID: 3,
        Img: "../../assets/productcard.jpg",
        Name: "iPhone 13",
        Price: 150,
        Quantity: 20,
        CreationDate:new Date()
      }
    );
    this.ProductList.push(
      {
        CateogryID: 2,
        ID: 4,
        Img: "../../assets/productcard.jpg",
        Name: "Digital cameras",
        Price: 100,
        Quantity: 1,
        CreationDate:new Date()
      }
    );
    this.ProductList.push(
      {
        CateogryID: 2,
        ID: 5,
        Img: "../../assets/productcard.jpg",
        Name: "LCD monitors",
        Price: 150,
        Quantity: 0,
        CreationDate:new Date()
      }
    );

    // this.CategoryList = new Array<ICategory>();
    // this.CategoryList.push(
    //   {
    //     ID:1,
    //     Name:"IPhone"
    //   }
    // );
    // this.CategoryList.push(
    //   {
    //     ID:2,
    //     Name:"Samsung"
    //   }
    // );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.GetSelectedID==0){
      this.ProductListNew = this.ProductList  
    }else{
      this.ProductListNew = this.ProductList.filter((p=>p.CateogryID==this.GetSelectedID));  
    } 
  }

  ngOnInit(): void {
  }
  Display(id:number){
    //const li=event?.target;
    console.log(id);
    this.IsPurshased = true;
    this.ProductListNew = this.ProductList.filter((p=>p.CateogryID==id));
  }
  selection(event:Event){
    console.log(event.target);
    this.IsPurshased = true;
    this.ProductListNew = this.ProductList.filter((p=>p.CateogryID==this.GetSelectedID));    
  }
  Buy(id:number){
    this.IsPurshased = !this.IsPurshased;
    let itemIndex = this.ProductList.findIndex(item => item.ID == id);
    //this.ProductList[itemIndex].Quantity -=1 ;

    console.log((this.ProductList.find(p=>p.ID==id)?.Quantity));
  }

  UpdateUserCart(id:number,Name:String,Price:number,userQuantity:number,Quantity:number){
    //Emit Event
    this.AddToCart.emit(new ProductViewModel(id, Name, Quantity, Price, userQuantity));
    console.log(new ProductViewModel(id,Name,Price,Quantity,this.userQuantity))
  }

  getValue(){
  }
}
