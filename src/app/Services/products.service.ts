import { Injectable } from '@angular/core';
import { ProductViewModel } from 'ViewModels/ProductViewModel';
import { ProductsComponent } from '../Components/products/products.component';
import { IProduct } from '../Models/iproduct';
import { ProductViewM } from '../ViewModels/product-view-model';
import { APIProductsService } from './apiproducts.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ProductList: Array<IProduct>;
  ProductViewModel: Array<ProductViewModel>;
  ProductViewM: Array<ProductViewM>;
  constructor(private APIProductsService:APIProductsService) {
    this.ProductList = new Array<IProduct>();
    this.ProductViewModel = []
    this.ProductViewM=[]
    this.APIProductsService.getAllProducts().subscribe(products=>{
      this.ProductViewM=products;
    })
    
    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 1,
    //     Img: "../../assets/1.jpg",
    //     Name: "iPhone 11",
    //     Price: 120,
    //     Quantity: 0,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 2,
    //     Img: "../../assets/2.jpg",
    //     Name: "iPhone 12",
    //     Price: 100,
    //     Quantity: 1,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 1,
    //     ID: 3,
    //     Img: "../../assets/3.jpg",
    //     Name: "iPhone 13",
    //     Price: 150,
    //     Quantity: 20,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 2,
    //     ID: 4,
    //     Img: "../../assets/C1.jpg",
    //     Name: "Digital cameras",
    //     Price: 100,
    //     Quantity: 1,
    //     CreationDate: new Date()
    //   }
    // );
    // this.ProductList.push(
    //   {
    //     CateogryID: 2,
    //     ID: 5,
    //     Img: "../../assets/productcard.jpg",
    //     Name: "LCD monitors",
    //     Price: 150,
    //     Quantity: 0,
    //     CreationDate: new Date()
    //   }
    // );

  }

  Get():IProduct[]{
    return this.ProductList;
  }
  
  GetByID(id:number):IProduct|undefined{
    return this.ProductList.find(p=>p.ID==id);
  }
  
  Insert(product:IProduct){
    this.ProductList.push(product);
  }
  
  GetProductsByCategoryID(id:number):IProduct[]{
    return this.ProductList.filter(p=>p.CateogryID==id);
  }
  
  RemoveUserOrderList(ID: number): Array<ProductViewModel>{
    let ProductViewModel: Array<ProductViewModel> = [];
    ProductViewModel=this.ProductViewModel.filter(p => p.ID != ID);
     this.ProductViewModel = ProductViewModel;
     return this.ProductViewModel;
    // this.TotalPrice = 0;
    // this.ProductViewModel.forEach(item => {
    //   this.TotalPrice += (item.UserQ * item.Price);
    // });
  }
  CalcTotalPrice(productViewModel:ProductViewModel[]):number{
    let TotalPrice=0;
    productViewModel.forEach(item => {
      TotalPrice += (item.UserQ * item.Price);
    });
    return TotalPrice;
  }
  AddInCart(ProductViewModel:ProductViewModel):number{
    console.log(ProductViewModel.UserQ)
    this.ProductViewModel.push(ProductViewModel);
    let TotalPrice = 0;
    TotalPrice += ProductViewModel.Price * ProductViewModel.UserQ;
    console.log("Addcardd "+ProductViewModel.UserQ)
    return TotalPrice;
  }
  CheckOut(elementRef:ProductsComponent){
    this.ProductViewModel.forEach(item => {
      elementRef.ProductListVM.forEach(pro => {
        if (pro.id == item.ID) {
          pro.Quantity -= item.UserQ;
          console.log("Quant = "+pro.Quantity,"QuantUser = "+item.UserQ);
        }
      })
    })
    this.ProductViewModel = [];
  }
  
  GetProductsIDs():number[]{
    let ProductNewList:Array<IProduct> = this.ProductList.filter(p=>p.Quantity>0);
    return ProductNewList.map(p=>p.ID);
  }

  GetAPIProductsIDs():number[]{
    let ProductViewM:Array<ProductViewM> = this.ProductViewM.filter(p=>p.Quantity>0);
    return ProductViewM.map(p=>p.id);
  }
  
  QuantityChange(id:number,QuantityUser:number){
    let TotalPrice = 0;
    this.ProductViewModel.forEach(p=>{
      p.UserQ=QuantityUser;
    })
    this.ProductViewModel.forEach(item => {
      console.log("QuantityChange "+item.UserQ);
      if (item.ID == id) {
        console.log("QuantityChange eq ID " +item.ID+"  " +item.UserQ);
        TotalPrice += (item.UserQ * item.Price);
      }
    });
    return TotalPrice;
  }
}
